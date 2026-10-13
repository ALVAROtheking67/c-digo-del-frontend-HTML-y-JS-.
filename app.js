document.addEventListener('DOMContentLoaded', async () => {
    try {
        // 1. Petición HTTP GET a la API local usando fetch()
        const respuesta = await fetch('http://localhost:3000/api/libros');
        const libros = await respuesta.json();

        // 2. Iterar sobre los datos e inyectarlos en la tabla HTML
        const tbody = document.querySelector('#tabla-libros tbody');
        
        libros.forEach(libro => {
            const fila = `
                <tr>
                    <td>${libro.id}</td>
                    <td>${libro.nombre}</td>
                    <td>${libro.autor}</td>
                </tr>
            `;
            tbody.innerHTML += fila;
        });

        // 3. Extraer información para la gráfica (Agrupando libros por autor)
        const conteoAutores = {};
        libros.forEach(libro => {
            // Si el autor ya existe, le suma 1, si no, lo inicia en 1
            conteoAutores[libro.autor] = (conteoAutores[libro.autor] || 0) + 1;
        });

        // Separar en dos arreglos: Etiquetas (Nombres de autores) y Valores (Cantidad de libros)
        const etiquetas = Object.keys(conteoAutores);
        const valores = Object.values(conteoAutores);

        // 4. Instanciar el gráfico de barras con Chart.js
        const ctx = document.getElementById('miGrafica').getContext('2d');
        
        new Chart(ctx, {
            type: 'bar', // Gráfico de barras
            data: {
                labels: etiquetas, // Arreglo de nombres
                datasets: [{
                    label: 'Cantidad de Libros por Autor',
                    data: valores, // Arreglo de cantidades
                    backgroundColor: 'rgba(54, 162, 235, 0.6)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: { stepSize: 1 } // Para que los números enteros se vean bien
                    }
                }
            }
        });

    } catch (error) {
        console.error('Error al consumir la API:', error);
    }
});