import s from "./Scores.module.scss";

function Scores({ scores }) {
    return (
        <div className={s.scores}>
            <div>
                <span>Player</span>
                <br />
                <span>{scores.x}</span>
            </div>
            <div>
                <span>Tie</span>
                <br />
                <span>{scores.tie}</span>
            </div>
            <div>
                <span>Computer</span>
                <br />
                <span>{scores.o}</span>
            </div>
        </div>
    );
}

export default Scores;