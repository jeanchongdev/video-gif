import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux"
import './index.less';

function Gif() {
    const { gifUrl, gifState, progress } = useSelector((state) => {
        return state
    })
    const [percent, setPercent] = useState('0')
    const [strokeDasharray, setStrokeDasharray] = useState('0 314')
    const set = (p) => {
        const total = Math.PI * 100;
        const str = `${p * total} ${total * (1 - p)}`;
        setStrokeDasharray(str)
        setPercent(Math.round(p * 100))
    }
    useEffect(() => {
        set(progress)
        if (progress == 1) {
            setTimeout(() => {
                setStrokeDasharray('0 314')
                setPercent('0')
            }, 1000)
        }
    }, [progress])

    return (
        <div className='video2gif-gif'>
            {gifState === 0 && <div className='video2gif-git-nothing'>
                Puedes subir tu video con el botón <b>"Cargar tu video"</b>.<br />
                Luego, ajusta el <b>ancho</b>, <b>alto</b>, <b>calidad</b> y <b>retraso</b> del GIF.<br />
                Haz clic en <b>"Comenzar"</b> para grabar y en <b>"Fin"</b> para generar el GIF.<br />
                Finalmente, haz clic en <b>"Descargar"</b> para guardarlo.
            </div>}
            {gifState === 1 && <canvas id="video2gif-gif-cvs"></canvas>}
            {gifState === 2 && <div className="video2gif-gif-progress">
                <svg width="200" height="200" viewBox="0 0 200 200">
                    <circle cx="100" cy="100" r="50" fill="none" strokeWidth="10" stroke="#fff" />
                    <circle className="video2gif-gif-progress-round" strokeDasharray={strokeDasharray} strokeLinecap="round" cx="100" cy="100" r="50" fill="none" strokeWidth="10" stroke="#db639b" transform="rotate(-90, 100, 100)" />
                    <text x="100" y="100" fill="#fff" textAnchor="middle" dominantBaseline="central">
                        <tspan>{percent}%</tspan>
                    </text>
                </svg>
                <div style={{ marginBottom: '50px' }}>El gif está creando...</div>
            </div>}
            {gifState === 3 && <a>{<img src={gifUrl} />}</a>}
        </div>
    );
}

export default Gif
