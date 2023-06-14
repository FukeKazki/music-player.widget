import { css, run } from "uebersicht";

export const command = `./music-player/music-player.widget/lib/nowplaying-cli get title artist artworkData artworkMIMEType duration elapsedTime playbackRate`

export const refreshFrequency = 500; // ms

export const className = `
  font-family: Source Han Code JP, Helvetica Neue;
  top: 50%;
  left: 50%;
`;

const styles = {
  container: css`
    display: grid;
    padding: 16px;
    grid-template-columns: 88px 1fr;
    gap: 16px;
    width: 280px;
    color: #fff;
    border-radius: 4px;
    background-color: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(20px);
  `,
  img: css`
    width: 88px;
    height: 88px;
    border-radius: 4px;
    background-color: rgba(255, 255, 255, 0.2);
    background-size: cover;
    background-position: center;
  `,
  contents:  css`
    display: flex;
    flex-direction: column;
  `,
  artist: css`
    font-weight: bold;
    margin: 0;
    font-size: 12px;
  `,
  title: css`
    margin: 0;
    margin-top: 4px;
    font-size: 8px;
    font-weight: bold;
  `,
  bar: css`
    width: 100%;
    height: 4px;
    border-radius: 2px;
    background-color: rgba(255, 255, 255, 0.2);
    span {
      display: block;
      height: 100%;
      border-radius: 2px;
      background-color: #fff;
    }
  `,
  controler: css`
    background-color: transparent;
    border: none;
    cursor: pointer;
    outline: none;
    padding: 0;
    appearance: none;
    fill: #fff;
    :hover {
      opacity: 0.7;
    }
`,
  controlers: css`
    display: flex;
    justify-content: center;
`
}


export const render = ({ output, ...props }) => {
  const [title, artist, artworkData, artworkMIMEType, duration, elapsedTime, playbackRate] = output.split('\n')
  return (
    <div className={styles.container}>
      <div className={styles.img} style={{ backgroundImage: `url("data:${artworkMIMEType};base64,${artworkData}")`}}/>
      <div className={styles.contents}>
        <p className={styles.artist}>{artist}</p>
        <p className={styles.title}>{title}</p>
        <p className={styles.bar}>
          <span style={{width: `${100*elapsedTime/duration}%`}}></span>
        </p>
        <div className={styles.controlers}>
          <button className={styles.controler} onClick={() => run("./music-player/music-player.widget/lib/nowplaying-cli previous")}>
            <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.5 18V6H7.5V18H5.5ZM18.5 18L9.5 12L18.5 6V18Z"/>
            </svg>
          </button>
          {playbackRate == 1 ? (
            <button className={styles.controler} onClick={() => run("./music-player/music-player.widget/lib/nowplaying-cli pause")}>
              <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 19V5H18V19H14ZM6 19V5H10V19H6Z"/>
              </svg>
            </button>
          ) : (
            <button className={styles.controler} onClick={() => run("./music-player/music-player.widget/lib/nowplaying-cli play")}>
              <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 19V5L19 12L8 19Z"/>
              </svg>
            </button>
          )}
          <button className={styles.controler} onClick={() => run("./music-player/music-player.widget/lib/nowplaying-cli next")}>
            <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.5 18V6H18.5V18H16.5ZM5.5 18V6L14.5 12L5.5 18Z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
