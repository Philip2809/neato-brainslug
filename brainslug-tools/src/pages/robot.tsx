import { useEffect, useState, useSyncExternalStore } from 'react';
import './robot.scss';
import { connectToRobot, robot, subscribeToRobot, getRobotUpdateTick } from '../logic/connect';
import type { DataKeyData } from '../logic/robot';
import TimeAgo from 'react-timeago';
import { useNavigate } from 'react-router-dom';

function Robot() {
  const [status, setStatus] = useState<string>('Not connected');
  const [filterResults, setFilterResults] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    if (!('serial' in navigator)) {
      navigate('/unsupported', { replace: true });
    }
  }, [navigate]);

  // Just use the external store to subscribe to a simple "update tick" counter.
  // When 'updateRobotStore()' is called, the tick increases, forcing React to rerender.
  useSyncExternalStore(subscribeToRobot, getRobotUpdateTick);

  if (!robot) return (
    <div className="card connect-robot">
      <span className='title'>Connect your Neato</span>
      <p className="subtitle">
        Remove the dustbin from your Neato vacuum and connect to the USB port.
        Click the button below and select your Neato, It may appear as <strong>"USB Serial Device (COMx)"</strong> on Windows,
        or <strong>"CDC Serial"</strong> / <strong>"ttyACM0"</strong> on Linux/MacOS. You can also try to unplug and replug to device
        to see which one appears if you're not sure.
      </p>

      <div className="toggle-row">
        <label className="switch">
          <input
            type="checkbox"
            checked={filterResults}
            onChange={() => setFilterResults(!filterResults)}
          />
          <span className="slider"></span>
        </label>
        <span className="toggle-label" onClick={() => setFilterResults(!filterResults)}>
          Filter by Neato device type
        </span>
        <span className="badge">Experimental</span>
      </div>

      <button className="connect" onClick={() => connectToRobot(setStatus, filterResults)}>
        Connect to Robot
      </button>

      <div className="status">Status: {status}</div>
    </div>
  )

  // Easily extract the value now to avoid ? all over the HTML
  const { version, charger, error } = robot;

  return (
    <div className='info-cards'>
      <InfoCard title="Version Info" data={version} />
      <InfoCard title="Error Info" data={error} />
      <InfoCard title="Charger Info" data={charger} />
    </div>
  )
}

function InfoCard({ title, data }: { title: string, data: DataKeyData }) {

  const hasData = data.basic.length > 0 || (data.advanced && data.advanced.length > 0);
  const [advancedVisible, setAdvancedVisible] = useState(false);

  return (
    <div className="card robot-info">
      <div className="info-header">
        <div className="title-group">
          <h2>{title}</h2>
          <span className="time-ago">Updated: <TimeAgo date={data.lastUpdated} /></span>
        </div>
        <div className="action-group">
          <button className="action-btn" onClick={() => robot?.sendCommand(data.command)}>Refresh</button>
          <span className="tooltip-wrap" title={(!data.advanced || data.advanced.length === 0) ? "No advanced data" : undefined}>
            <button className="action-btn" onClick={() => setAdvancedVisible(v => !v)} disabled={!data.advanced || data.advanced.length === 0}>
              {advancedVisible ? 'Hide Advanced' : 'Show Advanced'}
            </button>
          </span>
        </div>
      </div>
      {!hasData && <p className="no-data">No data received yet.</p>}
      <div className='table'>
        {data.basic.map(([key, value]) => (
          <div className='row' key={key}>
            <span className='key'>{key}:</span>
            <span>{value}</span>
          </div>
        ))}
        {advancedVisible && data.advanced && data.advanced.map(([key, value]) => (
          <div className='row' key={key}>
            <span className='key'>{key}:</span>
            <span>{value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Robot
