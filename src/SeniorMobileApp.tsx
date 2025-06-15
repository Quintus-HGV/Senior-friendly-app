import React, { useState, useEffect } from 'react';
import { Phone, MessageSquare, Camera, Calendar, Heart, Pill, Users, Settings, Home, Clock, Volume2, Search, Mic, Bell, Sun, Moon, Battery, Wifi } from 'lucide-react';

export default function SeniorFriendlyApp() {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [fontSize, setFontSize] = useState('text-2xl');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [notifications, setNotifications] = useState(3);
  const [batteryLevel, setBatteryLevel] = useState(85);
  const [isListening, setIsListening] = useState(false);
  const [weather, setWeather] = useState({ temp: 72, condition: 'sunny' });
  const [greeting, setGreeting] = useState('');
  const [medications, setMedications] = useState([
    { name: 'Blood Pressure Pill', time: '8:00 AM', taken: false, reminder: true },
    { name: 'Vitamin D', time: '12:00 PM', taken: false, reminder: false },
    { name: 'Heart Medication', time: '6:00 PM', taken: false, reminder: false }
  ]);
  const [calls, setCalls] = useState([
    { name: 'John (Son)', time: 'Today 2:30 PM', missed: false, duration: '15 min' },
    { name: 'Dr. Smith', time: 'Yesterday', missed: true, duration: 'Missed' },
    { name: 'Mary (Daughter)', time: 'June 13', missed: false, duration: '22 min' },
    { name: 'Pharmacy', time: 'June 12', missed: false, duration: '5 min' }
  ]);
  const [messages, setMessages] = useState([
    { from: 'John', text: 'How are you feeling today?', time: '2:30 PM', unread: true },
    { from: 'Dr. Smith', text: 'Appointment reminder for tomorrow', time: '1:15 PM', unread: true },
    { from: 'Mary', text: 'Call me when you can', time: '11:00 AM', unread: false }
  ]);
  const [photos, setPhotos] = useState(12);
  const [healthData, setHealthData] = useState({
    bloodPressure: '120/80',
    weight: 165,
    steps: 3500,
    heartRate: 72
  });

  const [emergencyContacts] = useState([
    { name: 'Emergency', number: '911', color: 'bg-red-600' },
    { name: 'Doctor', number: '555-0123', color: 'bg-blue-600' },
    { name: 'Family', number: '555-0456', color: 'bg-green-600' }
  ]);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Set greeting based on time
  useEffect(() => {
    const hour = currentTime.getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 17) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');
  }, [currentTime]);

  // Simulate battery drain
  useEffect(() => {
    const batteryTimer = setInterval(() => {
      setBatteryLevel(prev => Math.max(10, prev - Math.random() * 2));
    }, 30000);
    return () => clearInterval(batteryTimer);
  }, []);

  const fontSizes = {
    'text-xl': 'Normal',
    'text-2xl': 'Large', 
    'text-3xl': 'Extra Large'
  };

  const playSound = (type) => {
    // Simulate sound feedback
    console.log(`Playing ${type} sound`);
  };

  const handleVoiceCommand = () => {
    setIsListening(true);
    playSound('beep');
    setTimeout(() => {
      setIsListening(false);
      // Simulate voice recognition
      const commands = ['Call John', 'Check medications', 'Show appointments', 'Go home'];
      const command = commands[Math.floor(Math.random() * commands.length)];
      alert(`Voice command recognized: "${command}"`);
    }, 3000);
  };

  const takeMedication = (index) => {
    const newMeds = [...medications];
    newMeds[index].taken = !newMeds[index].taken;
    setMedications(newMeds);
    playSound(newMeds[index].taken ? 'success' : 'cancel');
    
    if (newMeds[index].taken) {
      // Celebration animation
      const button = document.activeElement;
      button.style.transform = 'scale(1.1)';
      setTimeout(() => {
        button.style.transform = 'scale(1)';
      }, 200);
    }
  };

  const makeCall = (contact) => {
    playSound('dial');
    alert(`Calling ${contact.name}...`);
    // Update call history
    const newCall = {
      name: contact.name,
      time: currentTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
      missed: false,
      duration: 'Calling...'
    };
    setCalls([newCall, ...calls]);
  };

  const readMessage = (index) => {
    const newMessages = [...messages];
    newMessages[index].unread = false;
    setMessages(newMessages);
    setNotifications(prev => Math.max(0, prev - 1));
    
    // Text-to-speech simulation
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(
        `Message from ${newMessages[index].from}: ${newMessages[index].text}`
      );
      utterance.rate = 0.8;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    }
  };

  const HomeScreen = () => (
    <div className="p-6 space-y-6">
      {/* Weather and Status Bar */}
      <div className="bg-gradient-to-r from-blue-400 to-blue-600 text-white p-4 rounded-xl">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center space-x-2">
            {weather.condition === 'sunny' ? <Sun size={24} /> : <Moon size={24} />}
            <span className={`${fontSize === 'text-xl' ? 'text-xl' : fontSize === 'text-2xl' ? 'text-2xl' : 'text-3xl'} font-bold`}>
              {weather.temp}°F
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Wifi size={20} />
            <div className="flex items-center space-x-1">
              <Battery size={20} />
              <span className="text-sm">{Math.round(batteryLevel)}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Greeting */}
      <div className="text-center">
        <h1 className={`${fontSize === 'text-xl' ? 'text-4xl' : fontSize === 'text-2xl' ? 'text-5xl' : 'text-6xl'} font-bold text-blue-900 mb-2 animate-pulse`}>
          {greeting}!
        </h1>
        <p className={`${fontSize} text-gray-700`}>
          {currentTime.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>
      </div>

      {/* Notifications Banner */}
      {notifications > 0 && (
        <div className="bg-yellow-100 border-l-4 border-yellow-400 p-4 rounded-lg animate-bounce">
          <div className="flex items-center">
            <Bell size={fontSize === 'text-xl' ? 24 : fontSize === 'text-2xl' ? 32 : 40} className="text-yellow-600 mr-3" />
            <p className={`${fontSize} font-bold text-yellow-800`}>
              You have {notifications} new notifications
            </p>
          </div>
        </div>
      )}

      {/* Voice Command Button */}
      <div className="text-center">
        <button
          onClick={handleVoiceCommand}
          className={`${isListening ? 'bg-red-500 animate-pulse' : 'bg-blue-500 hover:bg-blue-600'} text-white p-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110`}
        >
          <Mic size={fontSize === 'text-xl' ? 32 : fontSize === 'text-2xl' ? 40 : 48} />
        </button>
        <p className={`${fontSize === 'text-xl' ? 'text-lg' : fontSize === 'text-2xl' ? 'text-xl' : 'text-2xl'} text-gray-600 mt-2`}>
          {isListening ? 'Listening...' : 'Tap to speak'}
        </p>
      </div>

      {/* Main App Grid */}
      <div className="grid grid-cols-2 gap-4">
        <InteractiveButton
          icon={<Phone size={fontSize === 'text-xl' ? 32 : fontSize === 'text-2xl' ? 40 : 48} />}
          text="Call Family"
          onClick={() => setCurrentScreen('calls')}
          color="bg-green-500 hover:bg-green-600"
          badge={calls.filter(c => c.missed).length}
        />
        <InteractiveButton
          icon={<MessageSquare size={fontSize === 'text-xl' ? 32 : fontSize === 'text-2xl' ? 40 : 48} />}
          text="Messages"
          onClick={() => setCurrentScreen('messages')}
          color="bg-blue-500 hover:bg-blue-600"
          badge={messages.filter(m => m.unread).length}
        />
        <InteractiveButton
          icon={<Pill size={fontSize === 'text-xl' ? 32 : fontSize === 'text-2xl' ? 40 : 48} />}
          text="Medications"
          onClick={() => setCurrentScreen('medications')}
          color="bg-red-500 hover:bg-red-600"
          badge={medications.filter(m => m.reminder && !m.taken).length}
          pulse={medications.some(m => m.reminder && !m.taken)}
        />
        <InteractiveButton
          icon={<Calendar size={fontSize === 'text-xl' ? 32 : fontSize === 'text-2xl' ? 40 : 48} />}
          text="Appointments"
          onClick={() => setCurrentScreen('appointments')}
          color="bg-purple-500 hover:bg-purple-600"
        />
        <InteractiveButton
          icon={<Camera size={fontSize === 'text-xl' ? 32 : fontSize === 'text-2xl' ? 40 : 48} />}
          text="Photos"
          onClick={() => setCurrentScreen('photos')}
          color="bg-yellow-500 hover:bg-yellow-600"
          badge={photos}
        />
        <InteractiveButton
          icon={<Heart size={fontSize === 'text-xl' ? 32 : fontSize === 'text-2xl' ? 40 : 48} />}
          text="Health"
          onClick={() => setCurrentScreen('health')}
          color="bg-pink-500 hover:bg-pink-600"
        />
      </div>

      {/* Emergency Contacts */}
      <div className="mt-8 p-4 bg-red-50 border-2 border-red-200 rounded-xl">
        <h3 className={`${fontSize} font-bold text-red-800 mb-3 flex items-center`}>
          <Bell size={fontSize === 'text-xl' ? 24 : fontSize === 'text-2xl' ? 32 : 40} className="mr-2" />
          Emergency Contacts
        </h3>
        {emergencyContacts.map((contact, index) => (
          <button 
            key={index}
            onClick={() => makeCall(contact)}
            className={`w-full p-4 mb-2 ${contact.color} hover:opacity-90 text-white rounded-lg font-bold ${fontSize} transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg`}
          >
            <Phone size={fontSize === 'text-xl' ? 20 : fontSize === 'text-2xl' ? 24 : 28} className="inline mr-3" />
            {contact.name}: {contact.number}
          </button>
        ))}
      </div>
    </div>
  );

  const InteractiveButton = ({ icon, text, onClick, color, badge, pulse }) => (
    <div className="relative">
      <button
        onClick={() => {
          playSound('click');
          onClick();
        }}
        className={`${color} text-white p-6 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 min-h-[140px] flex flex-col items-center justify-center space-y-3 w-full ${pulse ? 'animate-pulse' : ''}`}
      >
        {icon}
        <span className={`${fontSize} font-bold text-center leading-tight`}>{text}</span>
      </button>
      {badge > 0 && (
        <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold animate-bounce">
          {badge}
        </div>
      )}
    </div>
  );

  const CallsScreen = () => (
    <div className="p-6">
      <h2 className={`${fontSize === 'text-xl' ? 'text-3xl' : fontSize === 'text-2xl' ? 'text-4xl' : 'text-5xl'} font-bold text-blue-900 mb-6`}>Recent Calls</h2>
      <div className="space-y-4">
        {calls.map((call, index) => (
          <div 
            key={index}
            className={`p-4 rounded-lg border-2 transition-all duration-300 hover:shadow-lg ${
              call.missed ? 'bg-red-50 border-red-300' : 'bg-green-50 border-green-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Phone 
                  size={fontSize === 'text-xl' ? 24 : fontSize === 'text-2xl' ? 32 : 40} 
                  className={call.missed ? 'text-red-600' : 'text-green-600'} 
                />
                <div>
                  <p className={`${fontSize} font-bold text-gray-800`}>{call.name}</p>
                  <p className={`${fontSize === 'text-xl' ? 'text-lg' : fontSize === 'text-2xl' ? 'text-xl' : 'text-2xl'} text-gray-600`}>
                    {call.time} • {call.duration}
                  </p>
                </div>
              </div>
              <button
                onClick={() => makeCall({ name: call.name.split(' ')[0] })}
                className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full transition-all duration-200 transform hover:scale-110"
              >
                <Phone size={fontSize === 'text-xl' ? 20 : fontSize === 'text-2xl' ? 24 : 28} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const MessagesScreen = () => (
    <div className="p-6">
      <h2 className={`${fontSize === 'text-xl' ? 'text-3xl' : fontSize === 'text-2xl' ? 'text-4xl' : 'text-5xl'} font-bold text-blue-900 mb-6`}>Messages</h2>
      <div className="space-y-4">
        {messages.map((msg, index) => (
          <div 
            key={index}
            className={`p-4 rounded-lg border-2 transition-all duration-300 hover:shadow-lg cursor-pointer ${
              msg.unread ? 'bg-blue-100 border-blue-400 shadow-md' : 'bg-gray-50 border-gray-300'
            }`}
            onClick={() => readMessage(index)}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <p className={`${fontSize} font-bold text-gray-800`}>{msg.from}</p>
                  {msg.unread && (
                    <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                  )}
                </div>
                <p className={`${fontSize === 'text-xl' ? 'text-lg' : fontSize === 'text-2xl' ? 'text-xl' : 'text-2xl'} text-gray-700 mb-2`}>
                  {msg.text}
                </p>
                <p className={`${fontSize === 'text-xl' ? 'text-base' : fontSize === 'text-2xl' ? 'text-lg' : 'text-xl'} text-gray-500`}>
                  {msg.time}
                </p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  readMessage(index);
                }}
                className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full transition-all duration-200 transform hover:scale-110"
              >
                <Volume2 size={fontSize === 'text-xl' ? 16 : fontSize === 'text-2xl' ? 20 : 24} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const MedicationsScreen = () => (
    <div className="p-6">
      <h2 className={`${fontSize === 'text-xl' ? 'text-3xl' : fontSize === 'text-2xl' ? 'text-4xl' : 'text-5xl'} font-bold text-blue-900 mb-6`}>Today's Medications</h2>
      <div className="space-y-4">
        {medications.map((med, index) => (
          <div 
            key={index} 
            className={`p-4 rounded-lg border-2 transition-all duration-300 ${
              med.taken 
                ? 'bg-green-100 border-green-300 shadow-md' 
                : med.reminder 
                  ? 'bg-yellow-100 border-yellow-400 animate-pulse shadow-lg' 
                  : 'bg-gray-100 border-gray-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={`w-4 h-4 rounded-full ${med.taken ? 'bg-green-500' : med.reminder ? 'bg-yellow-500 animate-ping' : 'bg-gray-400'}`}></div>
                <div>
                  <p className={`${fontSize} font-bold text-gray-800`}>{med.name}</p>
                  <p className={`${fontSize === 'text-xl' ? 'text-lg' : fontSize === 'text-2xl' ? 'text-xl' : 'text-2xl'} text-gray-600`}>
                    {med.time}
                  </p>
                </div>
              </div>
              <button 
                onClick={() => takeMedication(index)}
                className={`px-6 py-3 rounded-lg font-bold ${fontSize} transition-all duration-200 transform hover:scale-105 active:scale-95 ${
                  med.taken 
                    ? 'bg-green-500 text-white cursor-default' 
                    : 'bg-yellow-500 hover:bg-yellow-600 text-white animate-bounce'
                }`}
              >
                {med.taken ? '✓ Taken' : 'Take Now'}
              </button>
            </div>
            {med.reminder && !med.taken && (
              <div className="mt-3 p-2 bg-yellow-200 rounded-lg">
                <p className={`${fontSize === 'text-xl' ? 'text-base' : fontSize === 'text-2xl' ? 'text-lg' : 'text-xl'} text-yellow-800 font-semibold`}>
                  ⏰ Reminder: Time to take your medication!
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="mt-6 p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
        <h3 className={`${fontSize} font-bold text-blue-800 mb-2`}>Today's Progress</h3>
        <div className="flex space-x-4">
          <div className="text-center">
            <p className={`${fontSize === 'text-xl' ? 'text-2xl' : fontSize === 'text-2xl' ? 'text-3xl' : 'text-4xl'} font-bold text-green-600`}>
              {medications.filter(m => m.taken).length}
            </p>
            <p className={`${fontSize === 'text-xl' ? 'text-sm' : fontSize === 'text-2xl' ? 'text-base' : 'text-lg'} text-gray-600`}>Taken</p>
          </div>
          <div className="text-center">
            <p className={`${fontSize === 'text-xl' ? 'text-2xl' : fontSize === 'text-2xl' ? 'text-3xl' : 'text-4xl'} font-bold text-yellow-600`}>
              {medications.filter(m => !m.taken).length}
            </p>
            <p className={`${fontSize === 'text-xl' ? 'text-sm' : fontSize === 'text-2xl' ? 'text-base' : 'text-lg'} text-gray-600`}>Remaining</p>
          </div>
        </div>
      </div>
    </div>
  );

  const HealthScreen = () => (
    <div className="p-6">
      <h2 className={`${fontSize === 'text-xl' ? 'text-3xl' : fontSize === 'text-2xl' ? 'text-4xl' : 'text-5xl'} font-bold text-blue-900 mb-6`}>Health Dashboard</h2>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gradient-to-br from-red-100 to-red-200 p-4 rounded-lg border-2 border-red-300">
          <div className="text-center">
            <Heart size={fontSize === 'text-xl' ? 32 : fontSize === 'text-2xl' ? 40 : 48} className="text-red-600 mx-auto mb-2" />
            <p className={`${fontSize} font-bold text-red-800`}>Blood Pressure</p>
            <p className={`${fontSize === 'text-xl' ? 'text-xl' : fontSize === 'text-2xl' ? 'text-2xl' : 'text-3xl'} font-bold text-red-600`}>
              {healthData.bloodPressure}
            </p>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-4 rounded-lg border-2 border-blue-300">
          <div className="text-center">
            <div className="w-8 h-8 bg-blue-600 rounded-full mx-auto mb-2 flex items-center justify-center">
              <span className="text-white font-bold">♥</span>
            </div>
            <p className={`${fontSize} font-bold text-blue-800`}>Heart Rate</p>
            <p className={`${fontSize === 'text-xl' ? 'text-xl' : fontSize === 'text-2xl' ? 'text-2xl' : 'text-3xl'} font-bold text-blue-600`}>
              {healthData.heartRate} BPM
            </p>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-green-100 to-green-200 p-4 rounded-lg border-2 border-green-300">
          <div className="text-center">
            <div className="w-8 h-8 bg-green-600 rounded-full mx-auto mb-2 flex items-center justify-center">
              <span className="text-white font-bold">👟</span>
            </div>
            <p className={`${fontSize} font-bold text-green-800`}>Steps Today</p>
            <p className={`${fontSize === 'text-xl' ? 'text-xl' : fontSize === 'text-2xl' ? 'text-2xl' : 'text-3xl'} font-bold text-green-600`}>
              {healthData.steps.toLocaleString()}
            </p>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-100 to-purple-200 p-4 rounded-lg border-2 border-purple-300">
          <div className="text-center">
            <div className="w-8 h-8 bg-purple-600 rounded-full mx-auto mb-2 flex items-center justify-center">
              <span className="text-white font-bold">⚖</span>
            </div>
            <p className={`${fontSize} font-bold text-purple-800`}>Weight</p>
            <p className={`${fontSize === 'text-xl' ? 'text-xl' : fontSize === 'text-2xl' ? 'text-2xl' : 'text-3xl'} font-bold text-purple-600`}>
              {healthData.weight} lbs
            </p>
          </div>
        </div>
      </div>
      
      <button 
        onClick={() => {
          playSound('success');
          alert('Health data recorded successfully!');
        }}
        className={`w-full p-4 bg-pink-500 hover:bg-pink-600 text-white rounded-lg font-bold ${fontSize} transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg`}
      >
        Record New Reading
      </button>
    </div>
  );

  const SettingsScreen = () => (
    <div className="p-6">
      <h2 className={`${fontSize === 'text-xl' ? 'text-3xl' : fontSize === 'text-2xl' ? 'text-4xl' : 'text-5xl'} font-bold text-blue-900 mb-6`}>Settings</h2>
      
      <div className="space-y-6">
        <div className="p-4 bg-gray-50 rounded-lg border-2 border-gray-300">
          <h3 className={`${fontSize} font-bold text-gray-800 mb-4`}>Text Size</h3>
          <div className="space-y-3">
            {Object.entries(fontSizes).map(([size, label]) => (
              <button
                key={size}
                onClick={() => {
                  setFontSize(size);
                  playSound('click');
                }}
                className={`w-full p-4 rounded-lg font-bold transition-all duration-300 transform hover:scale-105 ${
                  fontSize === size 
                    ? 'bg-blue-500 text-white shadow-lg' 
                    : 'bg-white hover:bg-blue-100 text-gray-800 border-2 border-gray-300'
                } ${size}`}
              >
                {label} Text Size
              </button>
            ))}
          </div>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg border-2 border-gray-300">
          <h3 className={`${fontSize} font-bold text-gray-800 mb-4`}>Sound & Voice</h3>
          <div className="space-y-3">
            <button 
              onClick={() => {
                playSound('test');
                if ('speechSynthesis' in window) {
                  const utterance = new SpeechSynthesisUtterance('This is a test of the voice system');
                  utterance.rate = 0.8;
                  speechSynthesis.speak(utterance);
                }
              }}
              className={`w-full p-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-bold ${fontSize} transition-all duration-200 transform hover:scale-105 shadow-lg`}
            >
              <Volume2 size={fontSize === 'text-xl' ? 24 : fontSize === 'text-2xl' ? 32 : 40} className="inline mr-3" />
              Test Voice & Sound
            </button>
            
            <button 
              onClick={handleVoiceCommand}
              className={`w-full p-4 ${isListening ? 'bg-red-500 animate-pulse' : 'bg-green-500 hover:bg-green-600'} text-white rounded-lg font-bold ${fontSize} transition-all duration-200 transform hover:scale-105 shadow-lg`}
            >
              <Mic size={fontSize === 'text-xl' ? 24 : fontSize === 'text-2xl' ? 32 : 40} className="inline mr-3" />
              {isListening ? 'Listening...' : 'Test Voice Commands'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderScreen = () => {
    switch(currentScreen) {
      case 'calls': return <CallsScreen />;
      case 'messages': return <MessagesScreen />;
      case 'medications': return <MedicationsScreen />;
      case 'health': return <HealthScreen />;
      case 'settings': return <SettingsScreen />;
      case 'appointments':
        return (
          <div className="p-6">
            <h2 className={`${fontSize === 'text-xl' ? 'text-3xl' : fontSize === 'text-2xl' ? 'text-4xl' : 'text-5xl'} font-bold text-blue-900 mb-6`}>Upcoming Appointments</h2>
            <div className="space-y-4">
              {[
                { title: 'Dr. Johnson - Annual Checkup', date: 'June 18, 10:00 AM', type: 'medical' },
                { title: 'Eye Doctor - Vision Test', date: 'June 22, 2:00 PM', type: 'specialist' },
                { title: 'Dentist - Cleaning', date: 'June 25, 9:00 AM', type: 'dental' }
              ].map((apt, index) => (
                <div key={index} className="p-4 bg-purple-100 border-2 border-purple-300 rounded-lg hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Calendar size={fontSize === 'text-xl' ? 24 : fontSize === 'text-2xl' ? 32 : 40} className="text-purple-600" />
                      <div>
                        <p className={`${fontSize} font-bold text-gray-800`}>{apt.title}</p>
                        <p className={`${fontSize === 'text-xl' ? 'text-lg' : fontSize === 'text-2xl' ? 'text-xl' : 'text-2xl'} text-gray-600`}>{apt.date}</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => alert(`Reminder set for ${apt.title}`)}
                      className="bg-purple-500 hover:bg-purple-600 text-white p-3 rounded-full transition-all duration-200 transform hover:scale-110"
                    >
                      <Bell size={fontSize === 'text-xl' ? 20 : fontSize === 'text-2xl' ? 24 : 28} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'photos':
        return (
          <div className="p-6">
            <h2 className={`${fontSize === 'text-xl' ? 'text-3xl' : fontSize === 'text-2xl' ? 'text-4xl' : 'text-5xl'} font-bold text-blue-900 mb-6`}>Photo Gallery</h2>
            <div className="grid grid-cols-2 gap-4 mb-6">
              {[1,2,3,4,5,6].map((i) => (
                <div key={i} className="aspect-square bg-gradient-to-br from-yellow-100 to-yellow-200 border-2 border-yellow-300 rounded-lg flex items-center justify-center hover:shadow-lg transition-all duration-300 cursor-pointer">
                  <div className="text-center">
                    <Camera size={fontSize === 'text-xl' ? 32 : fontSize === 'text-2xl' ? 40 : 48} className="text-yellow-600 mx-auto mb-2" />
                    <p className={`${fontSize === 'text-xl' ? 'text-sm' : fontSize === 'text-2xl' ? 'text-base' : 'text-lg'} text-yellow-700`}>Photo {i}</p>
                  </div>
                </div>
              ))}
            </div>
            <button 
              onClick={() => {
                playSound('camera');
                setPhotos(prev => prev + 1);
                alert('Photo taken successfully!');
              }}
              className={`w-full p-4 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg font-bold ${fontSize} transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg`}
            >
              <Camera size={fontSize === 'text-xl' ? 24 : fontSize === 'text-2xl' ? 32 : 40} className="inline mr-3" />
              Take New Photo
            </button>
          </div>
        );
      default:
        return <HomeScreen />;
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4 flex items-center justify-between shadow-lg">
        <button 
          onClick={() => {
            playSound('click');
            setCurrentScreen('home');
          }}
          className="p-2 hover:bg-blue-700 rounded-lg transition-all duration-200 transform hover:scale-110"
        >
          <Home size={fontSize === 'text-xl' ? 24 : fontSize === 'text-2xl' ? 32 : 40} />
        </button>
        <h1 className={`${fontSize} font-bold`}>Senior Helper</h1>
        <button 
          onClick={() => {
            playSound('click');
            setCurrentScreen('settings');
          }}
          className="p-2 hover:bg-blue-700 rounded-lg transition-all duration-200 transform hover:scale-110"
        >
          <Settings size={fontSize === 'text-xl' ? 24 : fontSize === 'text-2xl' ? 32 : 40} />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto bg-gray-50">
        {renderScreen()}
      </div>

      {/* Footer with current time and status */}
      <div className="bg-white p-4 text-center border-t-2 border-gray-200 shadow-lg">
        <div className="flex items-center justify-center space-x-4">
          <div className="flex items-center space-x-2">
            <Clock size={fontSize === 'text-xl' ? 20 : fontSize === 'text-2xl' ? 24 : 28} className="text-gray-600" />
            <span className={`${fontSize === 'text-xl' ? 'text-lg' : fontSize === 'text-2xl' ? 'text-xl' : 'text-2xl'} font-bold text-gray-700`}>
              {currentTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
            </span>
          </div>
          {notifications > 0 && (
            <div className="bg-red-500 text-white rounded-full px-3 py-1 text-sm font-bold animate-pulse">
              {notifications} alerts
            </div>
          )}
        </div>
      </div>
    </div>
  );
}