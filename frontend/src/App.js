import './App.css';
import Chart from './pages/chart';
import Dignities from './pages/dignities';
import './fonts/Astro-ZLzx.ttf';

function App() {
  
  return (
    <div className="App">
      <table>
        <tbody>
          <tr>
            <td><Chart></Chart></td>
            <td><Dignities></Dignities></td>
          </tr>
        </tbody>
      </table>
      
    </div>
  );
}

export default App;
