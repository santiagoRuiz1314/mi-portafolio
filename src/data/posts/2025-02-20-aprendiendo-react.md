---
title: "Aprendiendo React en 2025"
date: "2025-02-20"
excerpt: "Una guía completa sobre cómo empezar con React en 2025, desde los conceptos básicos hasta las mejores prácticas."
coverImage: "/images/blog/ejemplo-articulo.jpg"
tags: ["react", "javascript", "tutorial", "frontend"]
featured: true
published: true
category: "Tutorial"
author: "Tu Nombre"
readingTime: 12
---

# Aprendiendo React en 2025: Una Guía Completa

React sigue siendo una de las bibliotecas más populares para el desarrollo frontend, y en 2025 ha evolucionado significativamente. En este artículo, te guío a través de todo lo que necesitas saber para empezar con React desde cero.

## ¿Qué es React?

React es una biblioteca de JavaScript desarrollada por Facebook para construir interfaces de usuario, especialmente aplicaciones de una sola página (SPA) donde necesitas un manejo eficiente del estado y una actualización rápida de la interfaz.

### Ventajas principales:

- **Virtual DOM**: Mejora significativamente el rendimiento
- **Componentes reutilizables**: Código más limpio y mantenible
- **Ecosistema robusto**: Miles de bibliotecas y herramientas
- **Comunidad activa**: Soporte constante y recursos abundantes

## Configurando el entorno de desarrollo

### 1. Requisitos previos

```bash
# Verificar versiones
node --version  # >= 18.0.0
npm --version   # >= 8.0.0
```

### 2. Crear una nueva aplicación

```bash
# Con Create React App
npx create-react-app mi-app --template typescript

# Con Vite (recomendado en 2025)
npm create vite@latest mi-app -- --template react-ts
cd mi-app
npm install
npm run dev
```

## Conceptos fundamentales

### Componentes funcionales

```jsx
import React from 'react';

function Saludo({ nombre }) {
  return <h1>¡Hola, {nombre}!</h1>;
}

// Como arrow function
const Saludo = ({ nombre }) => {
  return <h1>¡Hola, {nombre}!</h1>;
};

export default Saludo;
```

### Hooks esenciales

#### useState
```jsx
import React, { useState } from 'react';

function Contador() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Has hecho clic {count} veces</p>
      <button onClick={() => setCount(count + 1)}>
        Incrementar
      </button>
    </div>
  );
}
```

#### useEffect
```jsx
import React, { useState, useEffect } from 'react';

function EjemploEffect() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Efecto se ejecuta después del render
    fetch('/api/data')
      .then(response => response.json())
      .then(data => setData(data));
    
    // Cleanup function (opcional)
    return () => {
      console.log('Limpieza del efecto');
    };
  }, []); // Array de dependencias vacío = solo se ejecuta una vez

  return (
    <div>
      {data ? <p>{data.message}</p> : <p>Cargando...</p>}
    </div>
  );
}
```

## Mejores prácticas en 2025

### 1. Estructura de carpetas
```
src/
  components/
    common/
    ui/
  hooks/
  utils/
  services/
  types/
  pages/
```

### 2. TypeScript desde el inicio
```tsx
interface Props {
  title: string;
  isVisible?: boolean;
  onClick: () => void;
}

const Button: React.FC<Props> = ({ title, isVisible = true, onClick }) => {
  if (!isVisible) return null;
  
  return (
    <button onClick={onClick} className="btn-primary">
      {title}
    </button>
  );
};
```

### 3. Custom Hooks
```tsx
// hooks/useApi.ts
import { useState, useEffect } from 'react';

interface UseApiReturn<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

function useApi<T>(url: string): UseApiReturn<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Error en la petición');
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
}
```

## Herramientas recomendadas para 2025

### Desarrollo
- **Vite**: Build tool rápido y moderno
- **TypeScript**: Tipado estático esencial
- **ESLint + Prettier**: Calidad y formato de código
- **React DevTools**: Debugging y profiling

### Estado global
- **Zustand**: Simple y ligero
- **Redux Toolkit**: Para aplicaciones complejas
- **React Query/TanStack Query**: Manejo de estado del servidor

### Estilos
- **Tailwind CSS**: Utility-first CSS framework
- **Styled Components**: CSS-in-JS
- **CSS Modules**: Estilos locales

### Testing
- **Vitest**: Testing framework rápido
- **React Testing Library**: Testing enfocado en el usuario
- **Playwright**: Testing end-to-end

## Proyecto ejemplo: Lista de tareas

```tsx
import React, { useState } from 'react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const TodoApp: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputText, setInputText] = useState('');

  const addTodo = () => {
    if (inputText.trim()) {
      setTodos([
        ...todos,
        {
          id: Date.now(),
          text: inputText.trim(),
          completed: false
        }
      ]);
      setInputText('');
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id 
        ? { ...todo, completed: !todo.completed }
        : todo
    ));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Lista de Tareas</h1>
      
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          placeholder="Agregar nueva tarea..."
          className="flex-1 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={addTodo}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Agregar
        </button>
      </div>

      <ul className="space-y-2">
        {todos.map(todo => (
          <li
            key={todo.id}
            className="flex items-center gap-2 p-2 border rounded"
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
              className="w-4 h-4"
            />
            <span
              className={`flex-1 ${
                todo.completed 
                  ? 'line-through text-gray-500' 
                  : 'text-gray-900'
              }`}
            >
              {todo.text}
            </span>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="px-2 py-1 text-red-500 hover:bg-red-50 rounded"
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
```

## Recursos para seguir aprendiendo

### Documentación oficial
- [React.dev](https://react.dev) - Nueva documentación oficial
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)

### Cursos recomendados
- Epic React por Kent C. Dodds
- React - The Complete Guide por Maximilian Schwarzmüller
- Full Stack Open por Universidad de Helsinki

### Comunidad
- [React Reddit](https://reddit.com/r/reactjs)
- [React Discord](https://discord.gg/reactiflux)
- [Dev.to React tag](https://dev.to/t/react)

## Conclusión

React en 2025 es más maduro y poderoso que nunca. Con las herramientas adecuadas y siguiendo las mejores prácticas, puedes crear aplicaciones increíbles y maintibles.

¿Qué te pareció esta guía? ¿Hay algún tema específico sobre React que te gustaría que cubra en futuros artículos?

---

*¡Feliz coding!* 🚀