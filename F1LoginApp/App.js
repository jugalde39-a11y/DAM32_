import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [colorMensaje, setColorMensaje] = useState('red');
  const [cargando, setCargando] = useState(false);

  const iniciarSesion = () => {
    if (email === '' || password === '') {
      setMensaje('Completa todos los campos');
      setColorMensaje('red');
      return;
    }

    if (!email.includes('@')) {
      setMensaje('El email debe tener @');
      setColorMensaje('red');
      return;
    }

    if (password.length < 6) {
      setMensaje('Minimo 6 caracteres');
      setColorMensaje('red');
      return;
    }

    setMensaje('');
    setCargando(true);

    setTimeout(() => {
      setCargando(false);
      if (email === 'admin@test.com' && password === '123456') {
        setMensaje('Bienvenido!');
        setColorMensaje('green');
      } else {
        setMensaje('Credenciales incorrectas');
        setColorMensaje('red');
      }
    }, 2000);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.logo}>F1 TV</Text>
      <Text style={styles.title}>Iniciar sesión</Text>

      {/* Inputs */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {/* Mensaje */}
      {mensaje !== '' && (
        <Text style={{ color: colorMensaje, marginBottom: 10, fontWeight: 'bold' }}>
          {mensaje}
        </Text>
      )}

      {/* Boton */}
      <TouchableOpacity
        style={[styles.boton, cargando && { backgroundColor: '#a31105' }]}
        onPress={iniciarSesion}
        disabled={cargando}
      >
        <Text style={styles.textoBoton}>
          {cargando ? 'Cargando...' : 'Login'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#15151e', alignItems: 'center', justifyContent: 'center', padding: 20 },
  logo: { fontSize: 32, fontWeight: 'bold', color: '#e10600', marginBottom: 5 },
  title: { fontSize: 24, color: 'white', marginBottom: 30 },
  input: { width: '100%', height: 45, backgroundColor: 'white', borderRadius: 8, paddingHorizontal: 15, marginBottom: 15 },
  boton: { width: '100%', height: 45, backgroundColor: '#e10600', borderRadius: 8, alignItems: 'center', justifyContent: 'center', marginTop: 10 },
  textoBoton: { color: 'white', fontSize: 16, fontWeight: 'bold' }
});
