import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, SafeAreaView } from 'react-native';

export default function App() {
  const [mood, setMood] = useState(0);
  const data = mood < 0 ? { msg: "Me siento un poco triste", img: require('./assets/sad.png'), c: '#607D8B' } :
    mood === 0 ? { msg: "Me siento neutral", img: require('./assets/neutral.png'), c: '#FF9800' } :
      { msg: "¡Me siento muy feliz!", img: require('./assets/happy.png'), c: '#4CAF50' };

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.card, { borderTopColor: data.c }]}>
        <Text style={styles.title}>Contador de Ánimo</Text>
        <Image source={data.img} style={styles.img} />
        <Text style={[styles.msg, { color: data.c }]}>{data.msg}</Text>
        <View style={styles.countBox}><Text style={styles.countText}>{mood}</Text></View>
        <View style={styles.row}>
          <TouchableOpacity style={[styles.btn, { backgroundColor: '#F44336' }]} onPress={() => setMood(mood - 1)}>
            <Text style={styles.btnText}>Bajar ánimo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.btn, { backgroundColor: '#4CAF50' }]} onPress={() => setMood(mood + 1)}>
            <Text style={styles.btnText}>Subir ánimo</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', alignItems: 'center', justifyContent: 'center' },
  card: { backgroundColor: '#fff', borderRadius: 20, padding: 30, width: '85%', alignItems: 'center', elevation: 5, borderTopWidth: 8, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 20 },
  title: { fontSize: 24, fontWeight: '700', color: '#333', marginBottom: 20 },
  img: { width: 150, height: 150, marginBottom: 20, resizeMode: 'contain' },
  msg: { fontSize: 20, fontWeight: '600', marginBottom: 30, textAlign: 'center' },
  countBox: { backgroundColor: '#eee', borderRadius: 50, paddingHorizontal: 30, paddingVertical: 10, marginBottom: 30 },
  countText: { fontSize: 32, fontWeight: '800', color: '#444' },
  row: { flexDirection: 'row', gap: 15 },
  btn: { paddingVertical: 12, paddingHorizontal: 20, borderRadius: 12, minWidth: 120, alignItems: 'center' },
  btnText: { color: '#fff', fontSize: 14, fontWeight: '700' },
});
