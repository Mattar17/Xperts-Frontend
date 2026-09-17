import React from "react";
import WhoToFollow from "./WhoToFollow";
import styles from "./RightSidebar.module.css";

const trendingTopics = [
  { id: 1, tag: "#ReactJS", count: "2.3k" },
  { id: 2, tag: "#SystemDesign", count: "1.8k" },
  { id: 3, tag: "#RemoteWork", count: "950" },
  { id: 4, tag: "#MachineLearning", count: "1.5k" },
];

export default function RightSidebar() {
  return (
    <aside className={styles.rightSidebar}>
      {/* Trending Topics */}
      <div className={styles.card}>
        <h3 className={styles.title}>Trending Topics</h3>
        <div className={styles.topicsList}>
          {trendingTopics.map((topic) => (
            <div key={topic.id} className={styles.topicItem}>
              {topic.tag} ({topic.count})
            </div>
          ))}
        </div>
      </div>

      {/* Who to Follow */}
      <WhoToFollow />

      {/* My Activity Summary */}
      <div className={styles.card}>
        <div className={styles.cardHeaderWithAction}>
          <h3 className={styles.title} style={{ margin: 0 }}>
            My Activity Summary
          </h3>
          <span className={styles.optionalTag}>(Optional)</span>
        </div>
        <div className={styles.activityBox}>
          <div className={styles.activityStat}>Posts Made: 5</div>
          <div className={styles.activityStat}>Profile Views: 120</div>
        </div>
      </div>
    </aside>
  );
}

