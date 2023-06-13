import { css } from "uebersicht";

export const command = `./music-player/music-player.widget/lib/nowplaying-cli get title artist artworkData artworkMIMEType duration elapsedTime`

export const refreshFrequency = 2000; // ms

export const className = `
  font-family: Source Han Code JP, Helvetica Neue;
  top: 16px;
  left: 16px;
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
    object-fit: cover;
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
  `
}


export const render = ({ output, ...props }) => {
  const [title, artist, artworkData, artworkMIMEType, duration, elapsedTime] = output.split('\n')
  return (
    <div className={styles.container}>
      <img className={styles.img} src={`data:${artworkMIMEType};base64,${artworkData}`} width="88" height="88"/>
      <div className={styles.contents}>
        <p className={styles.artist}>{artist}</p>
        <p className={styles.title}>{title}</p>
        <p className={styles.bar}>
          <span style={{width: `${100*elapsedTime/duration}%`}}></span>
        </p>
      </div>
    </div>
  )
}
