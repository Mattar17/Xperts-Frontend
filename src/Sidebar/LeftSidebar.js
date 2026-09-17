import React, { useState } from "react";
import { Home, Users, Tag, Calendar } from "lucide-react";
import styles from "./LeftSidebar.module.css";

export default function LeftSidebar() {
  const [activeTab, setActiveTab] = useState("home");
  const [filterMode, setFilterMode] = useState("date");

  return (
    <aside className={styles.leftSidebar}>
      {/* Explore Section */}
      <h3 className={styles.sectionTitle}>Explore</h3>
      <nav className={styles.navSection}>
        <div
          className={`${styles.navItem} ${
            activeTab === "home" ? styles.navItemActive : ""
          }`}
          onClick={() => setActiveTab("home")}
        >
          {activeTab === "home" && <span className={styles.activeIndicator} />}
          <Home
            className={styles.navIcon}
            color={activeTab === "home" ? "#981316" : "#4b5563"}
          />
          <span>Home</span>
        </div>

        <div
          className={`${styles.navItem} ${
            activeTab === "network" ? styles.navItemActive : ""
          }`}
          onClick={() => setActiveTab("network")}
        >
          {activeTab === "network" && <span className={styles.activeIndicator} />}
          <Users
            className={styles.navIcon}
            color={activeTab === "network" ? "#981316" : "#4b5563"}
          />
          <span>My Network</span>
        </div>

        <div
          className={`${styles.navItem} ${
            activeTab === "topics" ? styles.navItemActive : ""
          }`}
          onClick={() => setActiveTab("topics")}
        >
          {activeTab === "topics" && <span className={styles.activeIndicator} />}
          <Tag
            className={styles.navIcon}
            color={activeTab === "topics" ? "#981316" : "#4b5563"}
          />
          <span>Topics</span>
        </div>

        <div
          className={`${styles.navItem} ${
            activeTab === "groups" ? styles.navItemActive : ""
          }`}
          onClick={() => setActiveTab("groups")}
        >
          {activeTab === "groups" && <span className={styles.activeIndicator} />}
          <Users
            className={styles.navIcon}
            color={activeTab === "groups" ? "#981316" : "#4b5563"}
          />
          <span>Groups</span>
        </div>

        <div
          className={`${styles.navItem} ${
            activeTab === "events" ? styles.navItemActive : ""
          }`}
          onClick={() => setActiveTab("events")}
        >
          {activeTab === "events" && <span className={styles.activeIndicator} />}
          <Calendar
            className={styles.navIcon}
            color={activeTab === "events" ? "#981316" : "#4b5563"}
          />
          <span>Events</span>
        </div>
      </nav>

      <div className={styles.divider} />

      {/* Quick Filter Section */}
      <h3 className={styles.sectionTitle}>Quick Filter</h3>
      <div className={styles.filterGroup}>
        <button
          type="button"
          className={`${styles.filterBtn} ${
            filterMode === "date" ? styles.filterBtnActive : ""
          }`}
          onClick={() => setFilterMode("date")}
        >
          Date
        </button>
        <button
          type="button"
          className={`${styles.filterBtn} ${
            filterMode === "relevance" ? styles.filterBtnActive : ""
          }`}
          onClick={() => setFilterMode("relevance")}
        >
          Relevance
        </button>
      </div>

      <div className={styles.divider} />

      {/* Quick Links Section */}
      <h3 className={styles.sectionTitle}>Quick Links</h3>
      <div className={styles.linksList}>
        <span className={styles.quickLink}>Manage Subscriptions</span>
        <span className={styles.quickLink}>Help Center</span>
      </div>
    </aside>
  );
}

