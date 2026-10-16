"use client";
import{useState, useRef} from "react";
export default function Home() {
    const [started, setStarted] = useState(false);
    const giveawayInputRef = useRef(null);
    const [message, setMessage] = useState("");
    const [linkAccepted, setLinkAccepted] = useState(false);
    const [settings, setSettings] = useState(false);
    const [winnerCount, setWinnerCount] = useState("1")
    const [backupCount, setBackupCount] = useState("0")
    const [winnerSelection, setWinnerSelection] = useState(false);
    const [participants, setParticipants] = useState ("");
    const [selectedWinners, setSelectedWinners] = useState ([]);
    const [selectedBackups, setSelectedBackups] = useState ([]);

    function handleContinue() {
        const link = giveawayInputRef.current?.value?.trim()||"";

        const isXLink =
        (link. startsWith("https://x.com/")||
    link. startsWith("https://twitter.com/")||
link. startsWith("https://www.twitter.com/"))&&
link. includes("/status/");
        if (!link) {
            setMessage("Please paste your X giveaway link.");
            setLinkAccepted(false);
            return;
        }
        if (!isXLink){
            setMessage("Please enter a valid X or Twitter post link.");
            setLinkAccepted(false);
            return;
        }
        setMessage("Link accepted! You can now configure your giveaway.");
        setLinkAccepted(true);
    }

    function handleWinnerCountChange(event) {
        setWinnerCount(event.target.value);
    }
    function handleBackupCountChange(event) {
        setBackupCount(event.target.value);
    }
    function handlePickWinners(){
        const names = [...new Set(
            participants
            .split("\n")
            .map((name)=>name.trim())
            .filter((name) => name !== "")
        )];
        const totalWinners = Number(winnerCount);
        const totalBackups = Number(backupCount);

        if (names.length===0){
            alert("Please enter participant usernames first.");
            return;
        }
        if(
            !Number.isInteger(totalWinners)||
            !Number.isInteger(totalBackups)||
            totalWinners <1 ||
            totalBackups <0 
        )
    {
    alert ("Please enter valid winner and backup counts.");
    return;
    }
if(totalWinners + totalBackups > names.length){
    alert ("You need enough unique participants for all winners and backups.");
    return;
}
for (let i =names.length-1;i>0;i--){
    const j =Math.floor(Math.random()*(i+1));
}
setSelectedWinners(names.slice(0,totalWinners));
setSelectedBackups(
    names.slice(totalWinners, totalWinners+totalBackups)
);
}
    return (
       <main>
        <h1>Verified Reward Picker</h1>
        <p>Verify. Select. Reward.</p>

        <p>
            A smarter way to verify giveaway participants and select eligible winners.

        </p>
        {!started ? (
            <button onClick={() =>
                setStarted(true)}>
                    Get Started
                </button>
        ) : (
            <section>
                <h2>Create a Giveaway</h2>
                <p>
                    Paste the link to your giveaway
                </p>
                <input
                id="giveawayLink"
                ref={giveawayInputRef}
                type="url"
                placeholder= "Paste your X giveaway link"
                />
                <button onClick={handleContinue}>
                    Continue
                </button>
                {message && <p>{message}</p>}
                {linkAccepted && (
                    <div>
                        <button onClick={() => setSettings(true)}>
                        Configure Giveaway
                        </button>
                    </div>
                )}
                {settings && (
                    <section>
                        <h2>Giveaway Settings</h2>

                        <p>
                            <strong>Giveaway link:</strong> {""}
                            <a href={giveawayInputRef.current?.value || "#"}
                            target="_blank"
                            rel="noreferrer"
                            >
                                View X post
                                </a>
                        </p>
                        <div>
                            <label htmlFor="winnerCount">
                                Number of Winners:
                                </label>
                                <br />
                                <input
                                id="winnerCount"
                                type="number"
                                min="1"
                                value={winnerCount}

                                onChange={handleWinnerCountChange}
                                />
                                </div>
                                <br />

                                <div>
                                    <label htmlFor="backupCount">
                                        Number of Backup Winners:
                                    </label>
                                    <br />
                                    <input
                                        id="backupCount"
                                        type="number"
                                        min="0"
                                        value={backupCount}
                                        onChange={handleBackupCountChange}
                                    />
                                </div>
                        <br />
                        <p>
                            You have selected {""} 
                            {winnerCount === ""? "_":
                            winnerCount} {""}
                            winner(s) and {""}
                            {backupCount === ""? "_":
                            backupCount} {""}
                            backup winner(s).
                           </p> 
                           <p>
                            You can change these numbers at any time before proceeding.
                        </p>
                        <button onClick={() => setWinnerSelection(true)}>
                            Continue to Winner Selection
                        </button>
            </section>
        )
            }
            </section>
        )}
        {winnerSelection && (
<section>
    <h2> Winner Selection</h2>
    <p> Your giveaway is ready for the next page.</p>
    <p> Number of Winners: {winnerCount}</p>
    <p> Number of Backup Winners: {backupCount}</p>
    <p> 
        Participant retrieval and eligibility verification must be completed before winners can be selected </p>
        <label htmlFor= "participants">
            Enter participant usernames(one per line):
        </label>
        <textarea
        id="participants"
        value={participants}
        onChange={(event) => setParticipants(event.target.value)}
        placeholder={"@username1\n@username2\n@username3"}
        rows={6}
        style={{
            display:"block",
            width: "100%",
            padding:"12px",
            marginTop:"8px",
            marginBottom:"16px",
        }}
        />
        <button onClick= {handlePickWinners}type= "button">
            Pick Winners
            </button>
            <div>
                <h3>🎉 Selected Winners </h3>
                <ol>
                    {selectedWinners.map((name) => (
                        <li key= {name}>{name}</li>
                    )
                    )}
                    </ol>
                    <h3>Backup Winners </h3>
                    {selectedBackups.length >0 ?(
                    <ol>
                        {selectedBackups.map((name) =>(
                            <li key={name}>{name}</li>
                        ))}
                        </ol>
                        ):(
                            <p> No backup winners selected.</p>
                        )} 
            </div>
                        )&rbrace;

</section>

        )}
       </main> 
    )
}