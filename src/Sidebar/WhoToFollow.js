import React, { useState } from "react";
import styles from "./WhoToFollow.module.css";

const initialPeople = [
  {
    id: 1,
    name: "Alex Chen",
    handle: "@AlexChen",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&h=120&q=80",
  },
  {
    id: 2,
    name: "Priya Sharma",
    handle: "@PriyaSharma",
    avatar:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&h=120&q=80",
  },
  {
    id: 3,
    name: "Shyan Frcomp",
    handle: "@Shyanrcomp",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80",
  },
];

export default function WhoToFollow() {
  const [followingMap, setFollowingMap] = useState({});

  const toggleFollow = (id) => {
    setFollowingMap((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className={styles.card}>
      <h3 className={styles.title}>Who to Follow</h3>
      <div className={styles.list}>
        {initialPeople.map((person) => {
          const isFollowing = !!followingMap[person.id];
          return (
            <div key={person.id} className={styles.item}>
              <div className={styles.userProfile}>
                <img
                  src={person.avatar}
                  alt={person.name}
                  className={styles.avatar}
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
                <div className={styles.info}>
                  <p className={styles.name}>{person.name}</p>
                  <p className={styles.handle}>{person.handle}</p>
                </div>
              </div>
              <button
                type="button"
                className={`${styles.followBtn} ${
                  isFollowing ? styles.followingBtn : ""
                }`}
                onClick={() => toggleFollow(person.id)}
              >
                {isFollowing ? "Following" : "Follow"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

