import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";
import { rebuild } from "../services/databaseService.js";

const Welcome = () => {
  const [mostWordsAdded, setMostWordsAdded] = useState([]);
  const [mostLanguagesAdded, setMostLanguagesAdded] = useState([]);
  
  //uncomment to rebuild the database. Remove when deploying
  // useEffect(() => {
  //   rebuild();
  // }, [])
  
   


  const findMostWords = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/getMostWords`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await response.json();
    setMostWordsAdded(data);
  };

  const findMostLanguages = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/getMostLanguages`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await response.json();
    setMostLanguagesAdded(data);
  };

  useEffect(() => {
    findMostWords();
    findMostLanguages();
  }, []);

  const handleOpenUser = (id) => {
    window.open(`${import.meta.env.VITE_FRONTEND_URL}/user/${id}`, "_blank");
  };

  return (
    <div className="welcome-page" style={{ textAlign: "center" }}>
      <h1 className="black-background">
        Build Beautiful, Functional Dictionaries with Ease
      </h1>
      <h2 className="black-background">
        Elatha is the modern dictionary-building app for linguists, conlangers,
        and educators
      </h2>

      <p style={{ marginTop: "50px" }} className="black-background">
        <b>
          Welcome to Elatha — a unique, powerful, and intuitive platform for
          creating professional-grade dictionaries.
        </b>
        <br />
        <br />
        Whether you're a field linguist, conlanger, educator, polyglot, or
        preserver of a minority language, Elatha turns the often tedious process
        of dictionary creation into a seamless, enriching experience.
        <br />
        <br />
        Easily add words, phrases, custom forms, and grammatical categories
        without worrying about formatting or technical complexity. Elatha
        handles the structure behind the scenes — including automatic generation
        of printable bilingual dictionaries with clean, polished PDFs.
        <br />
        <br />
        Build and link multiple dictionaries across a language family to create
        a richly interconnected, Wiktionary-style resource. Elatha even supports
        thesaurus construction, letting you group synonyms, or semantic fields,
        with just a few clicks.
        <br />
        <br />
        Upload a corpus, and Elatha will extract real-world example sentences
        automatically, attaching them to the relevant entries. It also compiles
        frequency lists, giving you a data-driven view of your language in
        action.
        <br />
        <br />
        Dive deeper with custom vocabulary stats, track etymologies, define
        descendant or borrowed words, and collaborate with others using built-in
        privacy controls and role-based permissions. Elatha adapts to your
        project — whether it's a single dialect or an entire language family.
      </p>

      <p className="black-background">
        <a className="word-link" href="#">
          Elatha User Guide
        </a>

        <div className="thin-white-border">
          <h4>Scoreboard</h4>
          <hr />
          <div className="scoreboard-div">
            <div className="left-scoreboard">
              <h6>Most Words Added</h6>

              <table className="scoreboard-table">
                <tbody>
                  {mostWordsAdded.map((row, index) => (
                    <tr key={index}>
                      <td style={{ width: "50px", textAlign: "right" }}>
                        #{index + 1}
                      </td>
                      <td
                        className="word-link"
                        style={{ width: "100px", textAlign: "left" }}
                        onClick={() => handleOpenUser(row.user_id)}
                      >
                        {row.username}
                      </td>
                      <td style={{ width: "120px", textAlign: "right" }}>
                        {row.words_added.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="right-scoreboard">
              <h6>Most Languages Added</h6>

              <table className="scoreboard-table">
                <tbody>
                  {mostLanguagesAdded.map((row, index) => (
                    <tr key={index}>
                      <td style={{ width: "50px", textAlign: "right" }}>
                        #{index + 1}
                      </td>
                      <td
                        className="word-link"
                        style={{ width: "100px", textAlign: "left" }}
                        onClick={() => handleOpenUser(row.user_id)}
                      >
                        {row.username}
                      </td>
                      <td style={{ width: "120px", textAlign: "right" }}>
                        {row.languages_added.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </p>
    </div>
  );
};

export default Welcome;
