import { useState } from "react";
import { TEST_BASE_URL } from "../Gobal";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import MessageBox from "../MessageBox";
import { useNavigate } from "react-router-dom";

export default function WritePostError({ error, closeError }) {
  const [codeSent, setCodeSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [emailVerified, setEmailVerified] = useState(false);
  const token = Cookies.get("token");
  const decodedToken = jwtDecode(token);
  const navigate = useNavigate();

  const handleCodeRequest = function () {
    fetch(`${TEST_BASE_URL}/api/auth/send-verification-code`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authentication: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCodeSent(true);
      });
  };

  const handleVerificationCodeChange = function (e) {
    setVerificationCode(e.target.value);
  };

  const handleVerifyCode = function () {
    fetch(`${TEST_BASE_URL}/api/auth/verify-email`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        Authentication: `Bearer ${token}`,
      },
      body: JSON.stringify({ code: verificationCode }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setEmailVerified(true);
          navigate("/login");
        }
      });
  };

  return (
    <div className="flex flex-col items-center mt-8">
      {emailVerified ? (
        <MessageBox
          className={`flex justify-between w-[520px] bg-white border shadow-md p-5 rounded-xl `}
        >
          <h1 className="text-green-600">Email Verified Successfully!</h1>
          <button
            onClick={closeError}
            className="text-2xl font-bold text-gray-400 hover:text-gray-600 transition ml-4"
          >
            &times;
          </button>
        </MessageBox>
      ) : (
        <div className={`w-[520px] bg-white border shadow-md p-5 rounded-xl `}>
          <div className="flex justify-between items-start">
            <div className="text-sm leading-6">
              {error && (
                <p className="text-red-500 mb-2">
                  {error}
                  <button
                    onClick={handleCodeRequest}
                    className="underline font-semibold hover:text-red-700 transition"
                  >
                    Verify now
                  </button>
                </p>
              )}

              {codeSent && (
                <p className="text-green-600 mb-3">
                  Code has been sent to: <strong>{decodedToken.email}</strong>
                </p>
              )}
            </div>

            <button
              onClick={closeError}
              className="text-2xl font-bold text-gray-400 hover:text-gray-600 transition ml-4"
            >
              &times;
            </button>
          </div>
          {/* Verification Input (only when codeSent = true) */}
          {codeSent && (
            <div className="mt-3">
              <label className="text-gray-600 text-sm">
                Enter verification code
              </label>
              <input
                type="text"
                value={verificationCode}
                onChange={(e) => handleVerificationCodeChange(e)}
                className="mt-1 w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-gray-300"
                placeholder="Enter the 6-digit code"
              />

              <button
                onClick={handleVerifyCode}
                className="mt-3 w-full btn text-white font-semibold p-2 rounded-lg hover:bg-red-700 transition"
              >
                Verify Code
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
