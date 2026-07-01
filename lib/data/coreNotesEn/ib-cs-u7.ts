/**
 * Core Notes English version — IB Computer Science Unit 7 (Control).
 * Faithful translation of the Korean 일타강사 original; all objectives, terms,
 * traps, and examples preserved at the same depth.
 */
import type { CoreNote } from "@/lib/coreNotes";

export const IB_CS_U7_EN: CoreNote[] = [
  {
    lessonId: "ib-cs-u7-l1",
    courseId: "ib-cs",
    subjectLabel: "IB Computer Science",
    emoji: "💻",
    unit: 7,
    lessonNum: 1,
    unitName: "Control",
    title: "Components of a Control System — From Sensor to Actuator",
    subtitle:
      "Sensors, transducers, actuators, and microprocessors — the four core parts that bridge the physical world and the digital world",
    overview:
      "Topic 7 is the unit in IB CS that deals with 'how a computer controls the real world.' The temperature app on a smartphone, automatic doors, washing machines, elevators — all of these systems share a common structure: a sensor that measures a physical signal, a transducer that converts that signal into digital data, a microprocessor/controller that processes the data and issues commands, and an actuator that acts on the physical world according to those commands. IB Paper 1 and Paper 2 frequently ask you to 'list the components of a control system and explain the role of each.' In this lesson we fully organise the definitions and physical characteristics of the four components, and the role each plays in the overall control flow.",
    objectives: [
      "List the four core components of a control system (sensor, transducer, microprocessor/controller, actuator) and explain the role of each",
      "Distinguish between a sensor and a transducer, and explain the role of an ADC (analogue-to-digital converter) in the process of converting an analogue signal into digital data",
      "Explain the input-process-output (IPO) cycle by which a microprocessor/controller processes input data to generate output commands",
      "Explain the types of actuator (electric motor, solenoid, heater, etc.) and give examples of the real-world control systems in which each is applied",
      "Describe the problems that arise in a control system when there is no feedback, and logically explain why a feedback loop enables precise control",
    ],
    sections: [
      {
        title: "Sensors and Transducers — Turning Physical-World Signals into Digital Data",
        subtitle:
          "Temperature, light, pressure, motion — the process by which an analogue signal becomes a number the controller can understand",
        terms: [
          {
            term: "Sensor",
            def: "An input device that detects changes in the physical environment (temperature, light, pressure, motion, humidity, etc.) and converts them into an electrical signal. The sensor itself converts a physical quantity into an electrical change (voltage, resistance, current), but this signal is still in analogue form. Example: a thermistor is a temperature sensor whose resistance changes as temperature rises; an LDR (Light Dependent Resistor) is a light sensor whose resistance changes with light intensity. IB key point: the sensor's role is to 'measure,' while issuing control commands is the role of the controller.",
          },
          {
            term: "Transducer",
            def: "A general term for any device that converts one form of energy into another. In the broad sense, a sensor is also a transducer (physical energy → electrical signal) and an actuator is also a transducer (electrical signal → physical energy). In IB Topic 7, 'transducer' usually refers to an ADC (Analogue-to-Digital Converter) — it converts the continuous analogue signal produced by a sensor into the discrete digital values the controller can process. Conversely, a DAC (Digital-to-Analogue Converter), which converts the controller's digital output into an analogue signal the actuator can understand, is also a transducer.",
          },
          {
            term: "ADC (Analogue-to-Digital Converter)",
            def: "A circuit that measures the continuous analogue voltage signal output by a sensor at regular time intervals (sampling) and encodes the measured values as binary numbers. Resolution: the number of bits the ADC uses — an 8-bit ADC represents 256 levels between 0 and 255, while a 12-bit ADC represents 4096 levels between 0 and 4095. The more bits, the closer the digitised signal is to the original analogue signal, but the amount of data also increases. In IB exams, a question asking 'why is an ADC needed?' is answered: because the controller (microprocessor) can only process digital data.",
          },
        ],
        traps: [
          "In IB exams, asserting that 'a sensor and a transducer are the same thing' loses marks. Every sensor is a transducer, but not every transducer is a sensor. An ADC and a DAC are transducers but are not sensors that 'detect' the environment. A high-scoring IB answer must distinguish the two stages: 'a sensor is an input transducer that converts a physical quantity into an electrical signal, and an ADC converts that analogue electrical signal into a digital value the controller can process.'",
          "Assuming that a sensor sends a digital signal directly to the controller is wrong. Most basic sensors (thermistors, LDRs, etc.) output analogue signals, so they must pass through an ADC before the controller can read them. While some modern digital sensors (e.g. I²C/SPI-interface temperature sensors) have a built-in ADC and output digital values directly, at the IB basic level you should memorise the three-stage flow sensor → ADC → controller as the standard answer.",
        ],
        example:
          "Let's concretely trace the process by which the analogue voltage output by a thermistor sensor in a temperature control system is converted into a digital value through an ADC.\n\n[Physical situation]\n  Room temperature: 23°C\n  Thermistor characteristic: resistance decreases as temperature rises\n    0°C → resistance 10kΩ → voltage 4.5V\n    25°C → resistance 5kΩ → voltage 2.5V\n    50°C → resistance 2kΩ → voltage 1.0V\n\n[ADC conversion — based on 8 bits]\n  Measurement range: 0V–5V mapped to 0–255\n  At 23°C, voltage ≈ 2.6V\n  Digital converted value: (2.6 / 5.0) × 255 ≈ 133 (binary: 10000101)\n\n[Controller receives]\n  The controller receives the integer 133\n  Setpoint: 25°C → corresponds to digital value 128\n  Error = 128 − 133 = −5 (current temperature is below the setpoint)\n  → The controller sends a 'turn heater on' command through the DAC to the actuator (heater)\n\nIB point: the controller processes only digital values. The bridge between the analogue world and the digital world is the ADC/DAC, and without this conversion a control system cannot operate.",
      },
      {
        title: "Microprocessor/Controller and Actuator — Processing and Execution",
        subtitle:
          "The IPO cycle, the controller's decisions, the actuator's physical action — the process by which a digital command becomes real-world movement",
        terms: [
          {
            term: "Microprocessor / Controller",
            def: "The 'brain' of the control system. It receives digital input data from the sensors, processes it using a pre-programmed algorithm (control logic), and issues output commands to the actuators. Difference from a general-purpose microprocessor (CPU): a control microcontroller (MCU) integrates CPU, RAM, ROM, and I/O ports on a single chip, making it suitable for embedded control systems that require small size, low power, and real-time response (e.g. Arduino, PIC). In IB, 'controller' and 'microprocessor' are used in the same context.",
          },
          {
            term: "Input-Process-Output cycle (IPO)",
            def: "The basic operating flow of a control system. Input: the sensor detects a physical quantity → the ADC converts it to digital → it is passed to the controller. Process: the controller compares the current value with the setpoint to compute the error and decides the output command. Output: the controller passes the command to the actuator → it is converted to an analogue signal through the DAC → a physical change is executed. This cycle repeats continuously while the control system is operating.",
          },
          {
            term: "Actuator",
            def: "An output device that receives the controller's output command and executes an actual action in the physical world (motion, heat, light, sound, etc.). An actuator operates from an analogue signal received through a DAC or from a digital switching signal. Main types: electric motor — rotational motion (elevators, automatic doors, washing-machine drums); solenoid — linear motion (automatic locks, opening/closing valves); heater/cooling fan — temperature regulation; LED/lighting — traffic lights and indicators. When an IB question asks about 'the role of the actuator in a real-world control system,' you must describe the specific physical action.",
          },
        ],
        traps: [
          "In IB exams, when describing the components of a control system, listing only 'sensor → controller → actuator' and omitting the transducer (ADC/DAC) earns only partial marks. Since an analogue sensor signal cannot enter the controller directly, and the controller's digital output often cannot connect directly to the actuator, you must explicitly include the roles of the ADC and DAC for a complete answer.",
          "Writing only that an actuator is an 'output device' without explaining the specific physical action will not earn high IB marks. For example, you must describe specifically what physical result it produces in that system: 'the actuator in a temperature control system is a heater, which turns the power on or off according to the controller's command to regulate the room temperature.'",
        ],
        example:
          "Let's trace one full Input-Process-Output cycle in an automatic greenhouse ventilation system.\n\n[Input]\n  Thermistor detects greenhouse air at 32°C (analogue) → ADC converts it to the digital value 163 → passed to the microcontroller\n\n[Process]\n  Controller holds setpoint 28°C (digital value 143)\n  Error = 143 − 163 = −20 (current temperature is above the setpoint)\n  Pre-programmed rule: if temperature > setpoint, open the vent window\n\n[Output]\n  Controller issues an 'open vent' command → the signal drives the actuator, an electric motor, which rotates to open the roof window → hot air escapes and the greenhouse cools\n\nIB point: the actuator here is not merely an 'output device' — it is an electric motor performing the specific physical action of rotating the vent window open, and the DAC/driver stage is what lets the controller's digital command reach it.",
      },
    ],
  },
  {
    lessonId: "ib-cs-u7-l2",
    courseId: "ib-cs",
    subjectLabel: "IB Computer Science",
    emoji: "💻",
    unit: 7,
    lessonNum: 2,
    unitName: "Control",
    title: "Feedback Loops — How a Control System Corrects Itself",
    subtitle:
      "Open-loop vs closed-loop, negative feedback, setpoint, error calculation — how a thermostat keeps temperature accurate",
    overview:
      "Among control systems, whether or not there is feedback makes a decisive difference to performance and accuracy. An open-loop system with no feedback only issues commands without checking the output result — e.g. an electric blanket driven only by a timer. A closed-loop system with feedback, by contrast, takes the output result back as input, calculates the error, and corrects it — e.g. a thermostat equipped with a temperature sensor. In IB Topic 7, the operating principle of the feedback loop is the most frequently examined core concept. Paper 1 extended-response questions repeatedly ask you to 'explain what problems arise without feedback,' and Paper 2 asks you to 'trace the feedback loop of a given control system.' In this lesson we fully organise the difference between open/closed loops, the principle of negative feedback, and the concepts of setpoint, error, and corrective action.",
    objectives: [
      "Define the difference between open-loop control and closed-loop control, and compare the advantages and disadvantages of each with real-world examples",
      "Explain, in order, the role feedback performs in closed-loop control — measuring the output, comparing with the setpoint, calculating the error, and corrective action",
      "Define the concept of negative feedback and describe how it contributes to maintaining the stability of a system",
      "Take a thermostat or central heating system as an example and trace each stage of the feedback loop step by step (sensor → ADC → controller → error calculation → actuator → feedback)",
      "Explain the overshoot and oscillation problems that can arise in a control system without a feedback loop, and discuss the principle by which feedback prevents them",
    ],
    sections: [
      {
        title: "Open-Loop vs Closed-Loop — The Difference Feedback Makes",
        subtitle:
          "Timer control vs sensor-feedback control — a system blind to environmental change versus one that corrects itself",
        terms: [
          {
            term: "Open-loop control",
            def: "A control method that does not take the output result back as input after executing a control command. The controller sends only predetermined commands (timer, fixed output) and does not check the actual result. Advantage: the structure is simple and the cost is low. Disadvantage: when a disturbance — an unexpected environmental change — occurs, the error cannot be corrected automatically. Example: washing time on a washing machine controlled only by a timer (fixed at 30 minutes regardless of water temperature or load amount), fixed-time traffic lights (repeating a set cycle regardless of traffic volume).",
          },
          {
            term: "Closed-loop control",
            def: "A control method that measures the output result with a sensor and feeds it back as input to the controller. The controller continuously calculates the error — the difference between the setpoint (target value) and the current measured value — and commands the actuator in the direction that minimises it. Advantage: it can correct automatically even under disturbances, enabling precise control. Disadvantage: the structure is complex and there is additional cost for the sensor and ADC. Example: central heating with a thermostat (a temperature sensor continuously measures the room temperature to maintain the set temperature).",
          },
          {
            term: "Negative feedback",
            def: "A feedback method that reduces an action when the output exceeds the setpoint and increases that action when it falls below the setpoint, converging the system to near the setpoint. In control systems, almost all stable feedback is negative feedback. Example: in a thermostat, when the room temperature exceeds the setpoint of 25°C the heater is turned off (heating action decreases), and when the temperature drops below 25°C the heater is turned on (heating action increases). Error = setpoint − current value; negative feedback tries to drive this error to 0.",
          },
          {
            term: "Setpoint and Error",
            def: "Setpoint: the target value the control system tries to maintain. Example: the desired temperature of 25°C on a thermostat, the target water level of a washing machine. Error: the difference between the setpoint and the current measured value. Error = setpoint − current value. If the error is positive, the current value is insufficient (e.g. temperature is low) → the controller operates the actuator in the increasing direction. If the error is negative, the current value is in excess (e.g. temperature is high) → the controller operates the actuator in the decreasing direction. If the error is 0, the system is in a steady state.",
          },
        ],
        traps: [
          "In IB exams you must avoid confusing 'feedback' with 'feedforward,' or asserting that 'feedback is always good.' Closed-loop control is not always superior to open-loop — for simple actions (e.g. a microwave timer), open-loop is sufficient and more economical. A high-scoring IB answer describes the trade-off: 'closed-loop is advantageous when precise control is required or disturbances are expected, while open-loop suits simple, low-cost systems.'",
          "Many students misunderstand 'negative feedback' as 'bad feedback' or 'feedback that shuts the system down.' 'Negative' carries the mathematical meaning of acting in the direction that reduces the error. In an IB extended-response asking you to 'explain why negative feedback maintains stability,' you must state that it is a self-correcting mechanism: 'as the error increases, the corrective action grows, converging the error back to 0.'",
        ],
        example:
          "Let's trace the closed loop of a thermostat temperature control system step by step to understand how feedback operates.\n\n[System settings]\n  Setpoint: 22°C\n  Heater-on condition: if current temperature < setpoint, heater ON\n  Heater-off condition: if current temperature ≥ setpoint, heater OFF\n  Measurement interval: every 30 seconds\n\n[Simulation trace]\n  Time 0s: current temperature 18°C\n    Error = 22 − 18 = +4°C (insufficient)\n    → Controller: heater ON command\n    → Actuator (heater) starts operating\n\n  Time 30s: sensor re-measures → current temperature 20°C\n    Error = 22 − 20 = +2°C (still insufficient)\n    → Controller: keep heater ON\n\n  Time 60s: sensor re-measures → current temperature 22°C\n    Error = 22 − 22 = 0°C (stable)\n    → Controller: heater OFF command\n    → Actuator (heater) stops\n\n  Time 90s: external window opens → current temperature 21°C\n    Error = 22 − 21 = +1°C (error recurs due to the disturbance)\n    → Controller: heater ON command (automatic corrective action!)\n\n[Feedback loop summary]\n  Sensor (temperature measurement) → ADC (analogue→digital) → controller (error calculation) → actuator (heater ON/OFF) → room temperature change → sensor (re-measurement, feedback) → ...\n\n[What if it were open-loop?]\n  At time 0s it only sends a 'run heater for 3 minutes' command and does not check the temperature\n  → If the weather changes suddenly or a window opens, even a large deviation from the target cannot be corrected\n\nIB point: the key advantage of closed-loop is that even when an unexpected disturbance occurs, it corrects automatically through feedback. IB mark schemes explicitly require this concept of 'automatic correction.'",
      },
      {
        title: "Overshoot and Oscillation — Problems When Feedback Is Too Strong",
        subtitle:
          "Overshoot, undershoot, oscillation — ideal feedback control versus the instability that arises in real systems",
        terms: [
          {
            term: "Overcorrection and Overshoot",
            def: "The phenomenon where, in the process of correcting the error, the controller passes the setpoint and acts excessively in the opposite direction. Example: a thermostat with a setpoint of 22°C where the heater operates too strongly and the temperature rises to 25°C. After overshoot, the controller corrects in the opposite direction (turning the heater off or cooling), but undershoot can occur again, so oscillation continues around the setpoint. In control theory, reducing overshoot requires a sophisticated algorithm such as proportional-integral-derivative (PID) control, but at the IB level you only need to understand the concept.",
          },
          {
            term: "Lag / Delay",
            def: "The time taken in a control system for a change in input to be reflected in the output. Example: when the heater is turned on, it takes several minutes for the room temperature to actually rise. The greater the lag, the more the system can deviate from the setpoint before the controller recognises and corrects the error, worsening overshoot and oscillation. The measurement interval (sampling interval) is also a form of delay: if temperature is measured every 30 seconds, changes during those 30 seconds are missed.",
          },
        ],
        traps: [
          "In IB exams, writing that 'with feedback, accurate control is always guaranteed' is wrong. Even with feedback, perfect control is difficult due to overshoot, oscillation, and system lag. A high-scoring IB answer includes the realistic limitation: 'closed-loop control is more precise than open-loop, but overshoot or oscillation can occur depending on system lag and the setting of control parameters.'",
          "Many answers omit the effect of the sampling interval on control quality. If the sampling interval is too long, rapid environmental changes are not detected in time and the error grows; if it is too short, the controller's processing load and power consumption increase. Including the sampling interval in an IB extended-response asking about 'factors to consider when designing a system' makes for a differentiated answer.",
        ],
        example:
          "Let's trace how overshoot and oscillation appear in an over-aggressive oven controller (setpoint 180°C) with significant lag.\n\n  Time 0min: 20°C → error +160°C → heater ON at full power\n  Time 5min: 180°C reached → heater OFF, but lag means the element is still hot\n  Time 7min: temperature keeps rising to 205°C → OVERSHOOT of +25°C above setpoint\n  Time 10min: controller sees error −25°C → heater stays OFF, oven cools\n  Time 14min: temperature falls to 160°C → UNDERSHOOT of −20°C → heater ON again\n  Time 18min: rises to 195°C → overshoot again, smaller this time\n  → the temperature OSCILLATES around 180°C, gradually settling\n\nIB point: even with correct negative feedback, system lag causes overshoot and oscillation, so feedback does not guarantee perfect control. Real controllers reduce this using PID control and a well-chosen sampling interval — sampling too slowly would let the temperature drift even further before each correction.",
      },
    ],
  },
  {
    lessonId: "ib-cs-u7-l3",
    courseId: "ib-cs",
    subjectLabel: "IB Computer Science",
    emoji: "💻",
    unit: 7,
    lessonNum: 3,
    unitName: "Control",
    title: "Real-World Control Systems and Distributed Control — From Traffic Lights to Autonomous Agents",
    subtitle:
      "Centralised vs distributed control, autonomous agents, comparison of real-world control systems — mastering the IB's classic scenarios",
    overview:
      "The final part of IB Topic 7 tests your ability to apply theory to real systems. The real-world control systems that appear most frequently in exams are the thermostat (central heating), traffic lights, automatic doors, washing machines, elevators, and GPS-based navigation. Identifying the sensor, transducer, controller, actuator, and feedback loop in each system is the key skill. Topic 7 also covers structural differences between control systems: centralised control — a single controller manages the whole system — and distributed control — several controllers cooperate to manage the system. Finally, the concept of an autonomous agent — a system that perceives its environment and decides and acts independently — also appears at IB HL level. In this lesson we fully organise real-world system analysis, the trade-offs of centralised/distributed control, and the definition and characteristics of an autonomous agent.",
    objectives: [
      "Identify the sensor, transducer, controller, actuator, and feedback path in real-world control systems such as traffic lights, thermostats, automatic doors, washing machines, and elevators, and explain the role of each",
      "Compare the structural difference between centralised control and distributed control, and describe the advantages and disadvantages of each with concrete examples",
      "Explain the definition of an autonomous agent — the cycle of perception, decision, and action — and describe how it differs from an ordinary control system",
      "Analyse a GPS-based navigation system from the perspective of a control system and identify the input (GPS signal, map data), process (route calculation), and output (voice/screen guidance) components",
      "Discuss why reliability, real-time response, and fault tolerance must be considered when designing real-world control systems",
    ],
    sections: [
      {
        title: "Analysing Real-World Control Systems — Mastering the IB's Classic Scenarios",
        subtitle:
          "Thermostat, traffic lights, automatic doors, washing machine, elevator — identifying each system's components to IB mark-scheme standard",
        terms: [
          {
            term: "Thermostat / Central heating",
            def: "A temperature sensor (thermistor) measures the room temperature (analogue → ADC → digital) → the controller compares it with the set temperature and calculates the error → if the error is positive (temperature insufficient) the boiler/heater (actuator) is ON, and if the error is 0 or below it is OFF. Closed-loop: the temperature sensor continuously measures to provide feedback → automatic correction. As this is the standard example most frequently used in IB exams, you must be able to trace the full flow sensor→ADC→controller→actuator→feedback perfectly.",
          },
          {
            term: "Traffic light control",
            def: "Basic type (open-loop): based on a timer, it repeats the signal sequence at preset time intervals (no feedback). Intelligent type (closed-loop): a loop detector embedded in the road or a camera (sensor) measures the number of waiting vehicles → the controller dynamically adjusts the signal timing according to traffic volume (actuator: LED traffic lights). The basic type is simple in structure but cannot respond to congestion, while the intelligent type allows real-time optimisation but is complex in structure. IB frequently asks you to compare the two methods.",
          },
          {
            term: "Automatic door / Washing machine / Elevator",
            def: "Automatic door: an infrared/microwave presence sensor → controller → an electric motor (actuator) opens and closes the door. Feedback: a door-open detection sensor confirms whether the door is fully open. Washing machine: a water-level sensor and temperature sensor measure water level and temperature → the controller compares them with the setpoints → it controls valves (intake/drain), heater, and drum motor (actuators). A composite control system combining timer and sensor feedback. Elevator: a floor-position sensor (encoder) → controller → a motor (actuator) moves to the precise floor. To prevent overcorrection, proportional control is used to reduce speed as the target floor is approached.",
          },
        ],
        traps: [
          "In IB exams, writing only generic answers to a question about a specific control system's components — without specifying the sensors and actuators particular to that system — earns only partial marks. Example: for a question on 'the sensor in an automatic door system,' writing only 'input device' loses marks — you must give a specific device name such as 'infrared proximity sensor or microwave motion sensor.' You must concretely memorise the types of sensor and actuator used by each system to earn high IB marks.",
          "Classifying traffic lights as open-loop unconditionally can be wrong. A 'basic traffic light' is a timer-based open loop, but a 'smart traffic light' is a closed loop using vehicle-detection sensors. If an IB question asks you to 'explain the control method of modern traffic signal systems,' you must mention both and compare the difference for a complete answer.",
        ],
        example:
          "Let's fully analyse a washing-machine control system to IB mark-scheme standard and learn the method of control-system analysis.\n\n[Analysis of washing-machine control system components]\n\n① Sensors\n  - Water level sensor (pressure-sensor type): detects the water level as an analogue pressure\n  - Temperature sensor (thermistor): detects the wash-water temperature\n  - Door lock sensor: detects whether the door is fully locked (safety feedback)\n  - Drum rotation encoder: detects the drum rotation speed (spin control)\n\n② Transducers\n  - ADC: converts the analogue water-level and temperature signals → digital values\n  - DAC: converts the controller's digital command → an analogue signal for motor-speed regulation\n\n③ Controller\n  - The microcontroller runs the wash programme (wash→rinse→spin sequence)\n  - At each stage it compares the setpoint (target water level, target temperature, target rotation count) with the current measured value to calculate the error\n\n④ Actuators\n  - Water inlet valve: fills with water\n  - Drain pump: drains water\n  - Heater: heats the water\n  - Drum motor: rotates for washing/spinning\n  - Door lock solenoid: locks the door during washing\n\n⑤ Feedback loop example — temperature control\n  Controller: target temperature 40°C\n  Thermistor: current temperature 35°C → ADC → digital value passed\n  Error = 40 − 35 = +5°C → heater ON command\n  Temperature rises → thermistor re-measures → error decreases → heater OFF when 40°C is reached\n  (closed-loop feedback)\n\n[Combining timer and feedback]\n  Wash time: timer-based (open loop) — 30-minute wash\n  Water level/temperature: sensor-feedback-based (closed loop) — precise control\n  → A washing machine is a hybrid control system mixing open loop and closed loop!\n\nIB point: a complex real-world control system like a washing machine uses both a timer (open loop) and sensor feedback (closed loop). A high-scoring IB answer must distinguish the two and specify which part each controls.",
      },
      {
        title: "Centralised vs Distributed Control and Autonomous Agents",
        subtitle:
          "Does a single controller decide everything, or do several controllers cooperate — and the autonomous agent that thinks for itself",
        terms: [
          {
            term: "Centralised control",
            def: "A control structure in which a single central controller receives and processes all sensor inputs of the whole system and issues commands to all actuators. Advantage: consistent optimisation of the whole system is possible, and management and programming are simple. Disadvantage: if the single controller fails, the entire system stops (single point of failure). Example: a smart building management system (BMS) where a single server controls all the lighting, temperature, and security within a building.",
          },
          {
            term: "Distributed control",
            def: "A control structure in which several independent controllers each control their own area and communicate with one another to cooperate when needed. Advantage: even if one controller fails, the other controllers keep working (fault tolerance). Scalability is high — to add a new zone you only need to add a new controller. Disadvantage: the communication protocols between controllers are complex, and whole-system optimisation is difficult. Example: a distributed traffic control system where each intersection has an independent controller while coordinating signal timing with adjacent intersections.",
          },
          {
            term: "Autonomous agent",
            def: "A system that, without direct external control, perceives its environment for itself and independently decides on actions to achieve a goal. The three characteristics of an autonomous agent: ① Perception — recognising the state of the environment through sensors; ② Reasoning/Decision-making — deciding the optimal action based on the goal and the current state (rule-based or AI/machine-learning-based); ③ Action — acting on the environment through actuators. Example: a self-driving car (perceives surroundings with cameras/LiDAR → AI decides the route → controls steering, acceleration, braking), a robot vacuum (detects obstacles → re-plans the path → controls motors). In IB, the key difference is that, unlike ordinary closed-loop control, an autonomous agent can perform not only pre-programmed rules but also goal-directed decision making.",
          },
        ],
        traps: [
          "In IB exams, writing only 'faster' as an advantage of distributed control earns partial marks. The key advantages of distributed control are fault tolerance and scalability. The improved reliability — that a single controller failure does not stop the whole system — is the point IB mark schemes emphasise. Conversely, you must also describe the disadvantages — 'complexity of inter-controller communication' and 'difficulty of whole-system optimisation' — in a balanced way to earn high marks.",
          "Equating an autonomous agent with an 'automated machine' is wrong. A simple washing machine or thermostat is an automated system that operates by predetermined rules, but an autonomous agent can revise its own strategy for achieving a goal in response to environmental changes. A high-scoring IB answer must make clear the difference: 'an autonomous agent differs from a simple control system in that, through goal-directed reasoning, it can adapt independently even in unexpected situations.'",
        ],
        example:
          "Let's fully analyse a GPS-based navigation system from the perspective of a control system and understand its potential to develop into an autonomous agent.\n\n[Analysing GPS navigation as a control system]\n\n① Input\n  - GPS receiver (sensor): receives satellite signals to calculate the current position (latitude, longitude, altitude) and speed\n  - Map database: road network, traffic rules, distance information\n  - User destination input\n  - Real-time traffic information (optional): speed data of other vehicles (distributed sensor network)\n\n② Process (the controller)\n  - Calculates the optimal route based on the current position and destination (Dijkstra's algorithm, etc.)\n  - Compares the current position with the planned route → calculates the error (whether the route has been deviated from)\n  - On route deviation: automatically recalculates a new route (feedback-based correction!)\n\n③ Output (equivalent to the actuator)\n  - Screen display: visualises the map and route\n  - Voice guidance speaker: 'In 300m, turn left'\n  - (when linked to autonomous driving) steering, acceleration, braking signals\n\n④ Feedback loop\n  GPS re-measurement → current position update → route error calculation → guidance correction\n  (repeats every 1–5 seconds)\n\n[GPS navigation as closed-loop control]\n  Setpoint: the next waypoint on the planned route\n  Current value: the actual vehicle position measured by GPS\n  Error: the deviation between the planned route and the actual position\n  Corrective action: correcting the voice guidance or recalculating the route\n\n[Extending to an autonomous agent]\n  Ordinary navigation: a human driver hears the guidance and acts → semi-autonomous\n  Self-driving car: GPS + camera + LiDAR + radar (multiple sensors) → an AI controller achieves the goal (reaching the destination, maintaining safety) for itself → a fully autonomous agent\n  Difference: an autonomous agent decides 'how to avoid an obstacle on the road' through goal-directed reasoning rather than rule-based logic\n\nIB point: GPS navigation is an excellent example of a closed-loop control system. IB mark schemes explicitly recognise that 'route deviation → automatic recalculation' is the automatic corrective action of a feedback loop.",
      },
    ],
  },
];
