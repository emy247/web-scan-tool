import React, { useState } from "react";
import "./App.css";

function App() {
  const [nmapCommand, setNmapCommand] = useState("");
  const [niktoCommand, setNiktoCommand] = useState("");
  const [sqlmapCommand, setSqlmapCommand] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState(null);

  const handleNmapChange = (event) => {
    setNmapCommand(event.target.value);
  };

  const handleNiktoChange = (event) => {
    setNiktoCommand(event.target.value);
  };

  const handleSqlmapChange = (event) => {
    setSqlmapCommand(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Make a request for nmap
      const nmapResponse = await fetch(
        "https://b56f-82-76-159-155.ngrok-free.app/execute",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ command: nmapCommand }),
        }
      );

      if (!nmapResponse.ok) {
        throw new Error("Network response was not ok");
      }

      const nmapData = await nmapResponse.json();
      const nmapOutput = nmapData.output;

      setOutput((prevOutput) => ({ ...prevOutput, nmapOutput }));
      setError(null);
    } catch (error) {
      setError("There was a problem with your fetch operation for Nmap");
      console.error(
        "There was a problem with your fetch operation for Nmap:",
        error
      );
    }

    try {
      // Make a request for nikto
      const niktoResponse = await fetch(
        "https://b56f-82-76-159-155.ngrok-free.app/execute",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ command: `nikto ${niktoCommand}` }),
        }
      );

      if (!niktoResponse.ok) {
        throw new Error("Network response was not ok");
      }

      const niktoData = await niktoResponse.json();
      const niktoOutput = niktoData.output;

      setOutput((prevOutput) => ({ ...prevOutput, niktoOutput }));
      setError(null);
    } catch (error) {
      setError("There was a problem with your fetch operation for Nikto");
      console.error(
        "There was a problem with your fetch operation for Nikto:",
        error
      );
    }

    try {
      const sqlmapResponse = await fetch(
        "https://b56f-82-76-159-155.ngrok-free.app/sqlmap",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ command: sqlmapCommand }),
        }
      );

      if (!sqlmapResponse.ok) {
        throw new Error("Network response was not ok");
      }

      const sqlmapData = await sqlmapResponse.json();
      const sqlmapOutput = sqlmapData.output;

      setOutput((prevOutput) => ({ ...prevOutput, sqlmapOutput }));
      setError(null);
    } catch (error) {
      setError("There was a problem with your fetch operation for Nmap");
      console.error(
        "There was a problem with your fetch operation for Nmap:",
        error
      );
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Nmap Command:
          <input
            type="text"
            value={nmapCommand}
            onChange={handleNmapChange}
            placeholder="Enter Nmap command"
          />
        </label>
        <br />
        <label>
          Nikto Command:
          <input
            type="text"
            value={niktoCommand}
            onChange={handleNiktoChange}
            placeholder="Enter Nikto command"
          />
        </label>

        <label>
          SqlMap Command:
          <input
            type="text"
            value={sqlmapCommand}
            onChange={handleSqlmapChange}
            placeholder="Enter Sqlmap command"
          />
        </label>

        <br />
        <button type="submit">Submit</button>
      </form>
      {output && (
        <div>
          <div>Nmap Output: {output.nmapOutput}</div>
          <div>Nikto Output: {output.niktoOutput}</div>
          <div>SqlMap Output: {output.sqlmapOutput}</div>
        </div>
      )}
      {error && <div>Error: {error}</div>}
    </div>
  );
}

export default App;
