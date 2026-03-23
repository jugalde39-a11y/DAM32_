import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, LayoutAnimation, UIManager, Platform, SafeAreaView } from 'react-native';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) UIManager.setLayoutAnimationEnabledExperimental(true);

const W = {
  sunny: { n: 'Soleado', msg: "Hace un día perfecto para salir ☀️", img: 'https://cdn-icons-png.flaticon.com/512/3222/3222800.png', bg: '#FFF9C4', tc: '#F57F17', min: 25, max: 35 },
  cloudy: { n: 'Nublado', msg: "El día está tranquilo y gris ☁️", img: 'https://cdn-icons-png.flaticon.com/512/414/414927.png', bg: '#CFD8DC', tc: '#455A64', min: 15, max: 22 },
  rainy: { n: 'Lluvioso', msg: "No olvides tu paraguas ☔", img: 'https://cdn-icons-png.flaticon.com/512/3313/3313888.png', bg: '#B3E5FC', tc: '#0277BD', min: 10, max: 18 },
  stormy: { n: 'Tormenta', msg: "Mejor quédate en casa ⛈️", img: 'https://cdn-icons-png.flaticon.com/512/3313/3313988.png', bg: '#37474F', tc: '#FFFFFF', min: 5, max: 12 }
};

export default function App() {
  const [w, setW] = useState('sunny');
  const [temp, setTemp] = useState(30);
  const [city, setCity] = useState('');
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [hist, setHist] = useState(['Soleado']);

  useEffect(() => {
    const i = setInterval(() => setTime(new Date().toLocaleTimeString()), 1000);
    return () => clearInterval(i);
  }, []);

  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const { min, max, n } = W[w];
    setTemp(Math.floor(Math.random() * (max - min + 1)) + min);
    setHist(prev => prev[0] === n ? prev : [n, ...prev].slice(0, 3));
  }, [w]);

  const randW = () => {
    const keys = Object.keys(W);
    setW(keys[Math.floor(Math.random() * keys.length)]);
  };

  const cur = W[w];
  return (
    <SafeAreaView style={[s.c, { backgroundColor: cur.bg }]}>
      <Text style={[s.time, { color: cur.tc }]}>{time}</Text>
      <TextInput style={[s.input, { borderColor: cur.tc, color: cur.tc }]} value={city} onChangeText={setCity} placeholder="Escribe tu ciudad..." placeholderTextColor={cur.tc} />
      <View style={[s.card, { backgroundColor: cur.tc + '15' }]}>
        <Text style={[s.title, { color: cur.tc }]}>{city || 'Mi Ciudad'}</Text>
        <Image source={{ uri: cur.img }} style={s.img} />
        <Text style={[s.temp, { color: cur.tc }]}>{temp}°C</Text>
        <Text style={[s.msg, { color: cur.tc }]}>{cur.msg}</Text>
      </View>
      <View style={s.btnRow}>
        {Object.keys(W).map(k => (
          <TouchableOpacity key={k} style={[s.btn, w === k && { borderWidth: 2, borderColor: cur.tc }]} onPress={() => setW(k)}>
            <Text style={{ color: W[k].tc, fontWeight: 'bold' }}>{W[k].n}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={s.btn} onPress={randW}><Text>🎲</Text></TouchableOpacity>
      </View>
      <Text style={{ color: cur.tc, marginTop: 15, fontWeight: 'bold' }}>Historial: {hist.join(' ← ')}</Text>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  c: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
  time: { fontSize: 18, fontWeight: 'bold', marginBottom: 15 },
  input: { borderWidth: 1, borderRadius: 10, padding: 12, width: '90%', marginBottom: 20, textAlign: 'center', fontSize: 16, fontWeight: '600' },
  card: { padding: 30, borderRadius: 25, alignItems: 'center', width: '90%', elevation: 5, shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 10 },
  title: { fontSize: 26, fontWeight: '800', marginBottom: 10 },
  img: { width: 150, height: 150, marginBottom: 15 },
  temp: { fontSize: 55, fontWeight: 'bold', marginBottom: 10 },
  msg: { fontSize: 18, textAlign: 'center', fontWeight: '700' },
  btnRow: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 10, marginTop: 30 },
  btn: { backgroundColor: 'rgba(255,255,255,0.6)', padding: 12, borderRadius: 12, minWidth: 70, alignItems: 'center' }
});
