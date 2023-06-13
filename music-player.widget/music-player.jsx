import { css } from "uebersicht";

export const command = `./music-player/music-player.widget/lib/nowplaying-cli get title artist artworkData artworkMIMEType duration elapsedTime`

export const refreshFrequency = 2000; // ms

export const className = `
  font-family: Source Han Code JP, Helvetica Neue;
  top: 8px;
  left: 8px;
`;
const containerCss = css`
  display: grid;
  padding: 16px;
  grid-template-columns: 88px 1fr;
  gap: 16px;
  width: 280px;
  color: #fff;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
`
const imgCss = css`
  width: 88px;
  height: 88px;
  border-radius: 4px;
  object-fit: cover;
`

const contentsCss = css`
  display: flex;
  flex-direction: column;
`

const artistCss = css`
  font-weight: bold;
  margin: 0;
  font-size: 12px;
`
const titleCss = css`
  margin: 0;
  margin-top: 4px;
  font-size: 8px;
  font-weight: bold;
`
const barCss = css`
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

export const render = ({ output, ...props }) => {
  const [title, artist, artworkData, artworkMIMEType, duration, elapsedTime] = output.split('\n')
  return (
    <div className={containerCss}>
      <img className={imgCss} src={`data:${artworkMIMEType};base64,${artworkData}`} width="88" height="88"/>
      <div className={contentsCss}>
        <p className={artistCss}>{artist}</p>
        <p className={titleCss}>{title}</p>
        <p className={barCss}>
          <span style={{width: `${100*elapsedTime/duration}%`}}></span>
        </p>
      </div>
    </div>
  )
}
