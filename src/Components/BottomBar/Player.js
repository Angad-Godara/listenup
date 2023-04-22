import { Icon } from "../../Icons";
import { useFullscreen, useToggle, useVideo } from 'react-use';
import { secondsToTime } from "../../util";
import CustomRange from "../CustomRange";
import { useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setControls, setPlaying, setSidebar, setplayerState } from "../../stores/player";
import FullScreenPlayer from "../FullScreenPlayer";
import './Player.css'

function Player() {

    const fsRef = useRef()
    const [show, toggle] = useToggle(false);
    const isFullscreen = useFullscreen(fsRef, show, { onClose: () => toggle(false) });

    const dispatch = useDispatch()
    const { current, sidebar } = useSelector(state => state.player)
    const videoSrc = current.isVideo ? current.video : current.src;

    const [video, state, controls, ref] = useVideo({
        src: videoSrc
    });

    useEffect(() => {
        if (controls)
            controls?.play()
    }, [current])

    useEffect(() => {
        dispatch(setPlaying(state.playing))
    }, [state.playing])

    useEffect(() => {
        dispatch(setControls(controls))
    }, [])

    const volumeIcon = useMemo(() => {
        if (state.volume === 0 || state.muted)
            return 'volumeMuted'
        if (state.volume > 0 && state.volume < 0.33)
            return 'volumeLow'
        if (state.volume >= 0.33 && state.volume < 0.66)
            return 'volumeNormal'
        return 'volumeFull'
    }, [state.volume, state.muted])

    return (
        <div className="flex px-4 justify-between items-center h-full">
            <div className="min-w-[11.25rem] w-[30%]">
                {current && (
                    <div className="flex items-center">
                        <div className="flex items-center mr-3">
                            {!sidebar && (
                                <div className="w-14 h-14 mr-3 relative group flex-shrink-0">
                                    <img src={current.image} alt="" />
                                    <button
                                        onClick={() => dispatch(setSidebar(true))}
                                        className="w-6 h-6 bg-black opacity-0 group-hover:opacity-60 hover:!opacity-100 hover:scale-[1.06] rotate-90 rounded-full absolute top-1 right-1 flex items-center justify-center">
                                        <Icon size={16} name="arrowLeft" />
                                    </button>
                                </div>
                            )}
                            <div>
                                <h6 className="text-sm line-clamp-1">{current.title}</h6>
                                <p className="text-[0.688rem] text-white text-opacity-70">{current.artist}</p>
                            </div>
                        </div>
                        <button
                            className="w-8 h-8 flex items-center justify-center text-white text-opacity-70 hover:text-opacity-100">
                            <Icon size={16} name="heart" />
                        </button>
                        <button
                            className="w-8 h-8 flex items-center justify-center text-white text-opacity-70 hover:text-opacity-100">
                            <Icon size={16} name="pictureInPicture" />
                        </button>
                    </div>
                )}
            </div>
            <div className="max-w-[45.125rem] w-[40%] pt-2 flex flex-col px-4 items-center">
                <div className="flex items-center gap-x-2">
                    <button
                        className="w-8 h-8 flex items-center justify-center text-white text-opacity-70 hover:text-opacity-100">
                        <Icon size={16} name="shuffle" />
                    </button>
                    <button
                        className="w-8 h-8 flex items-center justify-center text-white text-opacity-70 hover:text-opacity-100">
                        <Icon size={16} name="playerPrev" />
                    </button>
                    <button
                        onClick={controls[state?.playing ? 'pause' : 'play']}
                        className="w-8 h-8 bg-white flex items-center justify-center text-black rounded-full hover:scale-[1.06]">
                        <Icon size={16} name={state?.playing ? 'pause' : 'play'} />
                    </button>
                    <button
                        className="w-8 h-8 flex items-center justify-center text-white text-opacity-70 hover:text-opacity-100">
                        <Icon size={16} name="playerNext" />
                    </button>
                    <button
                        className="w-8 h-8 flex items-center justify-center text-white text-opacity-70 hover:text-opacity-100">
                        <Icon size={16} name="repeat" />
                    </button>
                </div>
                <div className="w-full flex items-center mt-1.5 gap-x-2 setscreen">
                    {!current?.isVideo && video}
                    <div className="text-[0.688rem] text-white text-opacity-70">
                        {secondsToTime(state?.time)}
                    </div>
                    <CustomRange
                        step={0.1}
                        min={0}
                        max={state?.duration || 1}
                        value={state?.time}
                        onChange={value => controls.seek(value)}
                    />
                    <div className="text-[0.688rem] text-white text-opacity-70">
                        {secondsToTime(state?.duration)}
                    </div>
                </div>
            </div>
            <div className="min-w-[11.25rem] w-[30%] flex items-center justify-end">
                <button
                    className="w-8 h-8 flex items-center justify-center text-white text-opacity-70 hover:text-opacity-100">
                    <Icon size={16} name="lyrics" />
                </button>
                <button
                    className="w-8 h-8 flex items-center justify-center text-white text-opacity-70 hover:text-opacity-100">
                    <Icon size={16} name="queue" />
                </button>
                <button
                    className="w-8 h-8 flex items-center justify-center text-white text-opacity-70 hover:text-opacity-100">
                    <Icon size={16} name="device" />
                </button>
                <button
                    onClick={controls[state.muted ? 'unmute' : 'mute']}
                    className="w-8 h-8 flex items-center justify-center text-white text-opacity-70 hover:text-opacity-100">
                    <Icon size={16} name={volumeIcon} />
                </button>
                <div className="w-[5.813rem] max-w-full">
                    <CustomRange
                        step={0.01}
                        min={0}
                        max={1}
                        value={state.muted ? 0 : state?.volume}
                        onChange={value => {
                            controls.unmute()
                            controls.volume(value)
                        }}
                    />
                </div>
                <button
                    onClick={() => {
                        dispatch(setplayerState(state));
                        toggle()
                    }}
                    className="w-8 h-8 flex items-center justify-center text-white text-opacity-70 hover:text-opacity-100">
                    <Icon size={16} name="fullScreen" />
                </button>
            </div>
            <div ref={fsRef}>
                {
                    <div className={isFullscreen ? "h-full relative" : 'hidden'} onClick={controls[state?.playing ? 'pause' : 'play']}>
                        {current?.isVideo ?
                            <div className="h-screen w-screen setfullscreen">
                                {video}
                            </div>
                            :
                            <div className="absolute inset-0 object-cover bg-center bg-cover blur-md opacity-30" style={{ backgroundImage: `url(${current.image})` }} />
                        }
                        <div className="absolute opacity-70 top-8 left-8 gap-x-4 text-white flex items-center">
                            <Icon size={34} name="logo" />
                            <div className="text-xs">
                                <p style={{ fontSize: 11 }}>PLAYING FROM PLAYLIST</p>
                                <h6 className="font-semibold mt-0.5">{current.title}</h6>
                            </div>
                        </div>
                        <div className="absolute left-8 bottom-36 flex items-center gap-x-5">
                            <img src={current.image} alt="" className="w-24 h-24 object-cover" />
                            <div className="self-end">
                                <h3 className="text-3xl font-bold">{current.title}</h3>
                                <p className="text-sm font-medium opacity-50">{current.description}</p>
                            </div>
                        </div>
                        <div onClick={e => {
                            e.stopPropagation()
                        }} className="w-full absolute bottom-4 flex flex-col px-8 items-center">
                            <div className="w-full flex items-center mb-1.5 gap-x-2">
                                <div className="text-[0.688rem] text-white text-opacity-70">
                                    {secondsToTime(state?.time)}
                                </div>
                                <CustomRange
                                    step={0.1}
                                    min={0}
                                    max={state?.duration || 1}
                                    value={state?.time}
                                    onChange={value => controls.seek(value)}
                                />
                                <div className="text-[0.688rem] text-white text-opacity-70">
                                    {secondsToTime(state?.duration)}
                                </div>
                            </div>
                            <div className="flex items-center gap-x-5">
                                <button
                                    className="w-8 h-8 flex items-center justify-center text-white text-opacity-70 hover:text-opacity-100">
                                    <Icon size={24} name="shuffle" />
                                </button>
                                <button
                                    className="w-8 h-8 flex items-center justify-center text-white text-opacity-70 hover:text-opacity-100">
                                    <Icon size={24} name="playerPrev" />
                                </button>
                                <button
                                    onClick={controls[state?.playing ? 'pause' : 'play']}
                                    className="w-16 h-16 bg-white flex items-center justify-center text-black rounded-full hover:scale-[1.06]">
                                    <Icon size={24} name={state?.playing ? 'pause' : 'play'} />
                                </button>
                                <button
                                    className="w-8 h-8 flex items-center justify-center text-white text-opacity-70 hover:text-opacity-100">
                                    <Icon size={24} name="playerNext" />
                                </button>
                                <button
                                    className="w-8 h-8 flex items-center justify-center text-white text-opacity-70 hover:text-opacity-100">
                                    <Icon size={24} name="repeat" />
                                </button>
                            </div>
                            <div className="flex items-center absolute bottom-3 right-6 gap-x-3">
                                <button
                                    onClick={controls[state.muted ? 'unmute' : 'mute']}
                                    className="w-8 h-8 flex items-center justify-center text-white text-opacity-70 hover:text-opacity-100">
                                    <Icon size={16} name={volumeIcon} />
                                </button>
                                <div className="w-[5.813rem] max-w-full">
                                    <CustomRange
                                        step={0.01}
                                        min={0}
                                        max={1}
                                        value={state.muted ? 0 : state?.volume}
                                        onChange={value => {
                                            controls.unmute()
                                            controls.volume(value)
                                        }}
                                    />
                                </div>
                                <button
                                    onClick={toggle}
                                    className="w-8 h-8 flex items-center justify-center text-white text-opacity-70 hover:text-opacity-100">
                                    <Icon size={24} name="fullScreenOff" />
                                </button>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div >
    )
}

export default Player
