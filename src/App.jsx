import { MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet'
import L from 'leaflet'
import AutoSvg from './AutoSvg'
import { useEffect, useState } from 'react'
import { Client } from '@stomp/stompjs'

function Evtclick({ onClick }) {
  useMapEvents({
    click(e) {
      onClick(e.latlng)
    }
  })
}

export default function App() {
  const [posicionAuto, setPosicionAuto] = useState([-32.858573, -68.883902])

  useEffect(() => {
    const cliente = new Client({
      brokerURL: 'ws://localhost:8080/websocket', // Use ws:// for WebSocket
    })
    cliente.onConnect = () => {
      console.log('Conectado')
      cliente.subscribe('/auto/coordenada', (m) => {
        let coordenada = JSON.parse(m.body)
        console.log('Coordenada recibida:', coordenada)
        setPosicionAuto([coordenada.x, coordenada.y])
      })
    }
    cliente.activate()
    return () => {
      if (cliente) {
        cliente.deactivate()
      }
    }
  }, [])

  const iconoAuto = L.divIcon({
    html: `<div class="svg-icon">${AutoSvg}</div>`,
    className: 'svg-icon',
    iconSize: [14, 14]
  })

  return (
    <MapContainer center={[-32.858573, -68.883902]} zoom={13} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Evtclick onClick={(coordenada) => console.log("coordenadas.add(new Coordenada(" + coordenada.lat + ", " + coordenada.lng + "));", coordenada)} />
      <Marker position={posicionAuto} icon={iconoAuto}></Marker>
    </MapContainer>
  );
}