// Extraemos useState desde la librería global de React
const { useState } = React;

// Definimos nuestro componente principal de la aplicación de tarjetas de estudio
function App() {
    // Estructura de datos: arreglo de objetos que contiene las preguntas, respuestas y su identificación
    const [tarjetas] = useState([
        { id: 1, pregunta: "¿Cuál es la diferencia entre var, let y const?", respuesta: "En JavaScript, var tiene ámbito de función y puede ser re-declarado; let y const tienen ámbito de bloque, permitiendo reasignación con let y bloqueándola con const." },
        { id: 2, pregunta: "¿Qué es el DOM en JavaScript?", respuesta: "El DOM (Document Object Model) es una representación en forma de árbol que crea el navegador de la página web, permitiendo que JavaScript interactúe con los elementos HTML." },
        { id: 3, pregunta: "¿Para qué sirve un método filter en los arreglos?", respuesta: "El método filter crea un nuevo arreglo con todos los elementos que pasen la condición implementada por la función dada." },
        { id: 4, pregunta: "¿Qué es una promesa (Promise) en JavaScript?", respuesta: "Es un objeto que representa la terminación o el fracaso eventual de una operación asincrónica y su valor resultante." }
    ]);
    // Estado para llevar el control del índice de la tarjeta actual que se está visualizando
    const [indiceActual, setIndiceActual] = useState(0);

    // Estado booleano para controlar si se muestra la respuesta (true) o la pregunta (false)
    const [mostrarRespuesta, setMostrarRespuesta] = useState(false);

    // Función para avanzar a la siguiente tarjeta de estudio
    const siguienteTarjeta = () => {
        setMostrarRespuesta(false); // ocultamos la respuesta al cambiar de tarjeta
        if (indiceActual < tarjetas.length - 1) {
            setIndiceActual(indiceActual + 1); // incrementamos el índice en 1
        }
    };
    // Función para retroceder a la tarjeta anterior
    const tarjetaAnterior = () => {
        setMostrarRespuesta(false); // ocultamos la respuesta al cambiar de tarjeta
        if (indiceActual > 0) {
            setIndiceActual(indiceActual - 1); // disminuimos el índice en 1
        }
    };
    // Función para alternar entre mostrar la pregunta o la respuesta al hacer clic
    const voltearTarjeta = () => {
        setMostrarRespuesta(!mostrarRespuesta); // invertimos el valor booleano actual
    };
    // Calculamos el porcentaje de progreso para la barra visual de la interfaz
    const porcentajeProgreso = ((indiceActual + 1) / tarjetas.length) * 100;
    return (
        // Contenedor principal de toda la tarjeta de flashcards
        <div className="tarjeta-contenedor">
            <h2>tarjetas flash</h2>
            {/* Sección de la barra de progreso y el contador de tarjetas */}
            <div className="contenedor-progreso">
                <div className="barra-progreso-externa">
                    <div className="barra-progreso-interna" style={{ width: `${porcentajeProgreso}%` }}></div>
                </div>
                <span className="texto-conteo">{indiceActual + 1} of {tarjetas.length}</span>
            </div>
            {/* Tarjeta interactiva principal que cambia entre pregunta y respuesta */}
            <div className="caja-flashcard" onClick={voltearTarjeta}>
                <p className="contenido-texto">
                    {mostrarRespuesta ? tarjetas[indiceActual].respuesta : tarjetas[indiceActual].pregunta}
                </p>
            </div>
            {/* Botones de navegación inferior */}
            <div className="contenedor-botones">
                <button 
                    onClick={tarjetaAnterior} 
                    disabled={indiceActual === 0} 
                    className="btn-navegacion">
                    &lt; anteriror
                </button>
                <button onClick={voltearTarjeta} className="btn-accion">
                    {mostrarRespuesta ? "Hide Answer" : "mostrar respuesta"}
                </button>
                <button 
                    onClick={siguienteTarjeta} 
                    disabled={indiceActual === tarjetas.length - 1} 
                    className="btn-navegacion">
                    siguiente &gt;
                </button>
            </div>
        </div>
    );
}
// Renderizamos nuestro componente App dentro del contenedor root usando ReactDOM
ReactDOM.createRoot(document.getElementById('root')).render(<App />);