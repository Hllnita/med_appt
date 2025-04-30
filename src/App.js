import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <Notification>
              <Routes>
                <Route path="/login" element={<Login />}/>
                <Route path="/signup" element={<SignUp />}/>
                <Route path="/instant-consultation" element={<InstantConsultation />} />
                 <Route path="<component_route>" element={<component_name/>}/> //Replace the component_route with the component path and component_name with the component name as imported in the App.js file. 
                />
              </Routes>
          </Notification>
        </BrowserRouter>
    </div>
  );
}

export default App;
