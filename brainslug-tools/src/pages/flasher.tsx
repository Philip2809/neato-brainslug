import './flasher.scss'
import { InstallButton } from "esp-web-tools"
import { useEffect, useRef, useState } from "react";
import { useNavigate } from 'react-router-dom';

function Flasher() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [gen, setGen] = useState<2 | 3 | null>(null);

  const navigate = useNavigate();
  useEffect(() => {
    if (!('serial' in navigator)) {
      navigate('/unsupported', { replace: true });
    }
  }, [navigate]);

  useEffect(() => {
    if (!gen) return;
    if (!containerRef.current) return;
    if (containerRef.current.children.length) {
      Array.from(containerRef.current.children).forEach(child => containerRef.current?.removeChild(child));
    }

    const button = new InstallButton();
    button.manifest = createManifest(gen);

    button.showLog = true;
    button.logConsole = true;

    containerRef.current.appendChild(button);

    containerRef.current.animate([
      { opacity: 0, transform: 'scale(0.95)' },
      { opacity: 1, transform: 'scale(1)' }
    ], { duration: 300, easing: 'ease-out' });
  }, [gen]);

  return (
    <div className="card flasher">
      <p className="success">Brainslug Web Flasher</p>
      <p>
        Select your Neato robot generation, D3-D7 robots are <code>gen3</code> and D70-D85 + BotVac Connected (wihtout D) is <code>gen2</code>.
        You can read more about the generations <a href="https://github.com/Philip2809/neato-brainslug/blob/main/README.md" target="_blank" rel="noopener noreferrer">on the GitHub</a>.
      </p>

      <div className="gen-picker">
        <button
          className={`gen-pick ${gen === 2 ? 'active' : ''}`}
          onClick={() => setGen(2)}
          style={{
            boxShadow: gen === 2 ? '0 0 8px 2px rgba(76, 175, 80, 0.6)' : 'none',
            transition: 'box-shadow 0.2s ease, transform 0.2s ease',
            transform: gen === 2 ? 'scale(1.05)' : 'scale(1)'
          }}
        >
          GEN 2
        </button>
        <button
          className={`gen-pick ${gen === 3 ? 'active' : ''}`}
          onClick={() => setGen(3)}
          style={{
            boxShadow: gen === 3 ? '0 0 8px 2px rgba(76, 175, 80, 0.6)' : 'none',
            transition: 'box-shadow 0.2s ease, transform 0.2s ease',
            transform: gen === 3 ? 'scale(1.05)' : 'scale(1)'
          }}
        >
          GEN 3
        </button>
      </div>


      <div ref={containerRef}></div>
    </div>
  )
}

export default Flasher


function createManifest(gen: number) {
  const genstr = gen === 2 ? 'gen2' : 'gen3';
  const getUrl = (filename: string) => new URL(filename, window.location.href).href;

  const manifest = {
    "name": `Neato Brainslug - ${genstr.toUpperCase()}`,
    "version": "1.2.1",
    "home_assistant_domain": "esphome",
    "funding_url": "https://ko-fi.com/philip2809",
    "builds": [
      {
        "chipFamily": "ESP32",
        "parts": [
          {
            "path": getUrl(`/webflash/nbs-${genstr}-esp32.factory.bin`),
            "offset": 0
          }
        ]
      },
      {
        "chipFamily": "ESP32-S3",
        "parts": [
          {
            "path": getUrl(`/webflash/nbs-${genstr}-esp32s3.factory.bin`),
            "offset": 0
          }
        ]
      },
      {
        "chipFamily": "ESP32-C3",
        "parts": [
          {
            "path": getUrl(`/webflash/nbs-${genstr}-esp32c3.factory.bin`),
            "offset": 0
          }
        ]
      }
    ]
  }
  const json = JSON.stringify(manifest);
  const blob = new Blob([json], { type: "application/json" });
  return URL.createObjectURL(blob);
}
