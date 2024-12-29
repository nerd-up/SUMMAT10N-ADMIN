// src/components/NewsFeed.js
import React, { useState, useEffect } from "react";
import { db, storage } from "../firebase";

const NewsFeed = () => {
  const [feeds, setFeeds] = useState([]);
  const [newFeed, setNewFeed] = useState({ text: "", media: null, link: "" });

  useEffect(() => {
    const fetchFeeds = async () => {
      const snapshot = await db.collection("newsFeeds").get();
      setFeeds(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchFeeds();
  }, []);

  const handleUpload = async () => {
    let mediaUrl = "";
    if (newFeed.media) {
      const storageRef = storage.ref(`/news/${newFeed.media.name}`);
      await storageRef.put(newFeed.media);
      mediaUrl = await storageRef.getDownloadURL();
    }

    await db.collection("newsFeeds").add({
      text: newFeed.text,
      media: mediaUrl,
      link: newFeed.link,
    });

    setNewFeed({ text: "", media: null, link: "" });
  };

  const deleteFeed = async (id) => {
    await db.collection("newsFeeds").doc(id).delete();
    setFeeds(feeds.filter(feed => feed.id !== id));
  };

  return (
    <div>
      <h3>News Feed</h3>
      <div>
        <input
          type="text"
          placeholder="Enter text"
          value={newFeed.text}
          onChange={(e) => setNewFeed({ ...newFeed, text: e.target.value })}
        />
        <input
          type="file"
          onChange={(e) => setNewFeed({ ...newFeed, media: e.target.files[0] })}
        />
        <input
          type="text"
          placeholder="YouTube Link"
          value={newFeed.link}
          onChange={(e) => setNewFeed({ ...newFeed, link: e.target.value })}
        />
        <button onClick={handleUpload}>Post</button>
      </div>
      <ul>
        {feeds.map(feed => (
          <li key={feed.id}>
            <p>{feed.text}</p>
            {feed.media && <img src={feed.media} alt="media" style={{ maxWidth: "200px" }} />}
            {feed.link && <a href={feed.link}>YouTube Link</a>}
            <button onClick={() => deleteFeed(feed.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default NewsFeed;
