/**
 * Core Notes English version — IB Computer Science Unit 3 (Networks).
 * Faithful translation of the Korean 일타강사 original; all objectives, terms,
 * traps, and examples preserved at the same depth.
 */
import type { CoreNote } from "@/lib/coreNotes";

export const IB_CS_U3_EN: CoreNote[] = [
  {
    lessonId: "ib-cs-u3-l1",
    courseId: "ib-cs",
    subjectLabel: "IB Computer Science",
    emoji: "💻",
    unit: 3,
    lessonNum: 1,
    unitName: "Networks",
    title: "Network Types and Architecture — LAN, WAN, PAN, VPN",
    subtitle:
      "Classify networks by scale, range, and purpose, and understand the structural differences between client-server and peer-to-peer models",
    overview:
      "If you think of a network simply as 'connecting to the internet,' you will struggle with IB Paper 1 structural questions. IB Topic 3 requires you to classify networks by geographic scope (LAN, WAN, PAN), distinguish architectures by how communication is coordinated (client-server or peer-to-peer), and explain the principle by which a VPN creates a secure tunnel over the public internet. Being able to describe specifically 'which devices connect, over what range, and by what method' is the key to reliably earning 2–4 marks on IB extended-response questions. In this lesson we organise network types and architectures using real-world analogies.",
    objectives: [
      "Compare and describe LAN, WAN, and PAN in terms of geographic range, ownership model, and bandwidth characteristics",
      "Analyse the structure, advantages, disadvantages, and appropriate use cases of the client-server model versus the peer-to-peer model",
      "Describe the principles by which a VPN implements secure communication over a public network (tunnelling and encryption)",
      "Evaluate the structure of star, bus, and ring topologies and identify whether each has a single point of failure",
      "Explain the differences between wired (Ethernet) and wireless (Wi-Fi) networks in terms of transmission medium, security, and interference",
    ],
    sections: [
      {
        title: "Network Scope Classification — LAN, WAN, PAN",
        subtitle:
          "From a single room to half the globe — three networks defined by range",
        terms: [
          {
            term: "Local Area Network (LAN)",
            def: "A network owned and managed by a single organisation within a limited geographic area (tens of metres to a few kilometres), such as a school, office, or home. Connected via Ethernet cables or Wi-Fi, LANs offer high bandwidth (100 Mbps–10 Gbps) and lower latency than external internet connections.",
          },
          {
            term: "Wide Area Network (WAN)",
            def: "A network spanning countries or continents. The internet itself is the largest WAN, built from leased lines, satellite links, and fibre-optic cables provided by telecommunications carriers. WANs have lower bandwidth and higher latency than LANs, and the infrastructure is typically owned by external service providers.",
          },
          {
            term: "Personal Area Network (PAN)",
            def: "A small-scale network connecting personal devices such as smartphones, earphones, and smartwatches within a range of a few metres. Bluetooth and NFC are the most common PAN technologies. PANs have the smallest range and are designed for low power consumption.",
          },
          {
            term: "Virtual Private Network (VPN)",
            def: "A technology that creates an encrypted tunnel between two points over a public internet (WAN), allowing secure communication as if on a private dedicated network. Used by remote workers to access a company LAN, or to bypass geographic content restrictions.",
          },
        ],
        traps: [
          "If an IB question asks you to 'explain the difference between the WAN and the internet,' writing only 'internet = WAN' will cost you marks. The internet is a specific public network that connects LANs and WANs worldwide using the TCP/IP protocol suite; WAN is a broader category referring to any network covering a wide geographic area. State the relationship clearly: 'the internet is a prominent example of a WAN.'",
          "Answers that treat PAN as a sub-type of LAN are common mistakes. A PAN is an independent category connecting only devices in a person's immediate personal space; its owner, range, and purpose are all different from a school Wi-Fi LAN. In classification questions, use range (a few metres vs kilometres) and technology (Bluetooth vs Ethernet/Wi-Fi) as clear distinguishing criteria.",
        ],
        example:
          "Let's trace how a VPN works through 'tunnelling' step by step. Imagine a remote employee connecting to a company server. (1) The VPN client on the employee's computer establishes an encrypted connection (tunnel) with the company's VPN server. (2) All of the employee's packets travel encrypted across the public internet. (3) The VPN server decrypts the packets and forwards them to the company's internal LAN. An external attacker cannot see the contents of the tunnel, and the employee can access internal resources exactly as if physically present on the company LAN.",
      },
      {
        title: "Network Architecture — Client-Server vs Peer-to-Peer",
        subtitle:
          "Who requests and who responds — the way roles are separated determines the system design",
        terms: [
          {
            term: "Client-server model",
            def: "An architecture in which the roles of service requester (client) and dedicated service provider (server) are separated. The server is always on and manages data, security, and permissions centrally. A web browser (client) and a web server are a classic example.",
          },
          {
            term: "Peer-to-peer model (P2P)",
            def: "An architecture in which each device (peer) on the network simultaneously acts as both client and server. Resources are shared directly between peers without a central server. BitTorrent and blockchain are leading examples of P2P systems; there is no single point of failure, but centralised security control is difficult.",
          },
          {
            term: "Single Point of Failure (SPOF)",
            def: "A component in a network or system whose failure causes the entire system to stop functioning. The central server in a client-server model and the hub/switch in a star topology are typical SPOFs. High-availability systems eliminate SPOFs through redundancy.",
          },
          {
            term: "Network topology",
            def: "The physical or logical arrangement of devices (nodes) and connections (links) in a network. In a star topology all nodes connect to a central switch; in a bus topology all nodes connect to a single cable; in a ring topology each node connects to its two adjacent neighbours in a loop.",
          },
        ],
        traps: [
          "Many answers list 'faster speed' as an advantage of the client-server model, but this is not accepted by IB mark schemes. The key advantages are 'centralised security, management, and backup,' and the key disadvantage is 'the server becomes a SPOF.' Speed is a function of topology or bandwidth, not an inherent advantage of the architecture choice.",
          "Writing that a star topology is 'the safest structure' will cost you marks. A star tolerates individual node failures well — no single node failure affects the rest — which gives high fault tolerance; however, the central switch (hub) is a SPOF, which is a critical disadvantage. A balanced discussion of both advantages and disadvantages is required for a 3–4 mark answer.",
        ],
        example:
          "Let's compare P2P and client-server using a file-sharing scenario. School server (client-server): Student A uploads a file; it is stored on the server; Student B downloads it from the server. If the server goes down, neither A nor B can access it — SPOF. BitTorrent (P2P): Student A shares a file as a torrent; Students B, C, and D each become peers and exchange pieces of the file with one another. If one peer leaves, the file can still be obtained from the remaining peers. In IB design questions you are expected to 'choose an architecture and justify that choice with specific reasons.'",
      },
    ],
  },
  {
    lessonId: "ib-cs-u3-l2",
    courseId: "ib-cs",
    subjectLabel: "IB Computer Science",
    emoji: "💻",
    unit: 3,
    lessonNum: 2,
    unitName: "Networks",
    title: "OSI Layers, Protocols, and Packet Switching",
    subtitle:
      "Understand where TCP/IP, HTTP, and DNS sit in the OSI 7-layer model, and how packets are divided and reassembled",
    overview:
      "If you only memorise that a protocol is 'a set of rules,' you will be stuck on IB Paper 2 questions that ask you to analyse the role of each layer. IB Topic 3 requires you to map each layer's role and representative protocols onto the OSI 7-layer model, and to understand why packet switching is better suited to the internet than circuit switching. IP addresses versus MAC addresses, and the reliability trade-off between TCP and UDP, are all covered in this one unit — so memorising each concept together with its layer position is the key to high marks.",
    objectives: [
      "List the name and key role of each OSI layer in order, together with a representative protocol for each layer",
      "Explain the correspondence between the TCP/IP 4-layer model and the OSI 7-layer model, and describe why TCP/IP is used on the real internet",
      "Explain the principle by which packet switching uses network resources efficiently, contrasting it with circuit switching",
      "Distinguish the role and layer position of an IP address (logical address) from a MAC address (physical address)",
      "Compare TCP and UDP in terms of reliability, connection method, and representative use cases",
    ],
    sections: [
      {
        title: "The OSI 7-Layer Model",
        subtitle:
          "The international standard reference model that abstracts network communication into seven layers",
        terms: [
          {
            term: "OSI model (Open Systems Interconnection model)",
            def: "An ISO reference model that divides network communication into seven layers: Physical (1) → Data Link (2) → Network (3) → Transport (4) → Session (5) → Presentation (6) → Application (7). Each layer requests services only from the layer directly below it and provides services only to the layer directly above it. It is used primarily as a conceptual framework for protocol design and fault diagnosis rather than as an actual implementation.",
          },
          {
            term: "Transmission Control Protocol (TCP)",
            def: "A connection-oriented protocol at the OSI Transport layer (layer 4) that provides reliable communication. It establishes a connection via a 3-way handshake and handles packet ordering, lost-packet retransmission, and congestion control. Used by HTTP, HTTPS, email (SMTP), and FTP.",
          },
          {
            term: "User Datagram Protocol (UDP)",
            def: "A connectionless protocol at the OSI Transport layer (layer 4) that transmits datagrams without establishing a connection. Because there is no guarantee of packet ordering or retransmission, overhead is low and latency is short. Well suited to DNS lookups, online gaming, and real-time streaming (RTP).",
          },
          {
            term: "Hypertext Transfer Protocol (HTTP / HTTPS)",
            def: "A protocol at the OSI Application layer (layer 7) that exchanges HTML, images, and data between a web browser and a server in a request-response format. HTTPS adds TLS (Transport Layer Security) to encrypt the transmitted content.",
          },
        ],
        traps: [
          "The OSI layers are numbered 1 (Physical) through 7 (Application), but many IB extended-response answers simply list layer names without explaining their roles. Mark schemes require 'layer name + function performed by that layer + example protocol.' In particular, do not confuse the Data Link layer (uses MAC addresses) with the Network layer (uses IP addresses).",
          "Comparing TCP and UDP simply as 'slow/fast' earns only partial marks. A high-scoring IB answer must also address 'reliability (presence or absence of retransmission and ordering guarantees)', 'connection method (connection-oriented vs connectionless)', and 'appropriate use cases.' Back up your answer with specific examples, such as why UDP is used for DNS (a single short request-response exchange that reduces overhead).",
        ],
        example:
          "Let's trace a web page request travelling down and back up the OSI layers. The browser requests 'https://example.com.' (1) Application layer (7): an HTTP GET request message is created. (2) Transport layer (4): TCP segments the message and specifies the port (443). (3) Network layer (3): IP adds the destination IP address to the header, creating a packet. (4) Data Link layer (2): a MAC address is added to create a frame. (5) Physical layer (1): bits are converted to electrical signals and transmitted. At the server, encapsulation is reversed layer by layer to retrieve the HTTP request. The concept of 'each layer adding or removing a header' — encapsulation — is a key IB keyword.",
      },
      {
        title: "Packet Switching and IP vs MAC Addresses",
        subtitle:
          "How the internet breaks data into pieces and reassembles them, and the distinct roles of two types of address",
        terms: [
          {
            term: "Packet switching",
            def: "A method of dividing data into fixed-size packets (header + payload) that are routed independently. Each packet may travel via a different path and is reassembled at the destination. Unlike circuit switching, no dedicated path needs to be reserved, so network resources can be shared efficiently.",
          },
          {
            term: "IP address (Internet Protocol address)",
            def: "A logical address used at the OSI Network layer (layer 3). IPv4 is 32 bits (e.g. 192.168.1.1); IPv6 is 128 bits. It indicates a device's position on the network and is used by routers to forward packets to their destination. It can be assigned dynamically via DHCP.",
          },
          {
            term: "MAC address (Media Access Control address)",
            def: "A physical address used at the OSI Data Link layer (layer 2). It is a 48-bit address (e.g. 00:1A:2B:3C:4D:5E) permanently assigned to a network interface card (NIC) during manufacture. It is used to deliver frames to the correct device within the same network segment.",
          },
          {
            term: "Domain Name System (DNS)",
            def: "A distributed database system that translates human-readable domain names (e.g. www.example.com) into IP addresses. It uses UDP port 53. Before a browser connects to a web server it always performs a DNS lookup to obtain the IP address.",
          },
        ],
        traps: [
          "Swapping the layer positions of IP and MAC addresses is an extremely common mistake. IP address → Network layer (3), used by routers; MAC address → Data Link layer (2), used by switches and NICs. Memorise the contrast as: 'IP = logical, changeable, used for routing' vs 'MAC = physical, fixed, used for local delivery.' Stating the layer number explicitly earns higher marks.",
          "Writing 'faster' as the only advantage of packet switching earns only partial marks. The key points are 'resource sharing (multiplexing) — no dedicated path required' and 'fault tolerance — if one path fails, packets can be routed via another path.' Contrast with circuit switching (dedicated reserved line vs per-packet independent routing) explicitly.",
        ],
        example:
          "Let's trace the complete flow from DNS lookup to TCP connection to HTTP request. You type 'www.ibo.org' into a browser. (1) DNS lookup: the browser sends a UDP packet to the DNS server asking 'What is the IP of www.ibo.org?' The DNS server responds '159.8.120.3.' (2) TCP 3-way handshake: the browser (client) sends SYN to 159.8.120.3:443 → server responds SYN-ACK → client sends ACK to establish the connection. (3) HTTPS request: after TLS encryption over the TCP connection, an HTTP GET is sent → the server splits the HTML into packets and responds. This sequence makes clear why DNS uses UDP (fast single exchange) while file transfer uses TCP (reliability).",
      },
    ],
  },
  {
    lessonId: "ib-cs-u3-l3",
    courseId: "ib-cs",
    subjectLabel: "IB Computer Science",
    emoji: "💻",
    unit: 3,
    lessonNum: 3,
    unitName: "Networks",
    title: "Data Transmission, Compression, and Network Security",
    subtitle:
      "Bandwidth, lossy/lossless compression, encryption, and firewalls — the principles behind sending data quickly and securely",
    overview:
      "If you assume that more bandwidth always means faster transmission, you will be disappointed by your IB assessment marks. IB Topic 3 requires you to distinguish bandwidth from throughput, understand the mechanisms by which lossy and lossless compression reduce file size, and explain how encryption, authentication, and firewalls defend against network security threats. In this lesson the three areas — transmission efficiency, compression, and security — are linked as a single thread: the challenge of getting data to its destination intact.",
    objectives: [
      "Distinguish between bandwidth and throughput, and describe factors that affect actual transmission speed",
      "Compare the principles, representative formats, and appropriate use cases of lossy and lossless compression",
      "Describe the structure and differences between symmetric encryption and asymmetric (public-key) encryption, and explain the context in which each is used",
      "Analyse major network security threats — firewalls, authentication issues, and malicious software — and the countermeasures for each",
      "Explain the role that network protocols and standards play in ensuring interoperability",
    ],
    sections: [
      {
        title: "Bandwidth and Data Compression",
        subtitle:
          "Distinguishing the width of the pipe from the volume of water — and two ways to lighten the load before sending",
        terms: [
          {
            term: "Bandwidth",
            def: "The maximum amount of data a network link can transmit per unit time. Measured in bps (bits per second), Mbps, or Gbps. Bandwidth is a theoretical upper limit; actual throughput is always lower than bandwidth due to network congestion, latency, and packet loss.",
          },
          {
            term: "Lossy compression",
            def: "A compression method that reduces file size by discarding information that is difficult for human senses to detect. The original cannot be perfectly restored. JPEG (images), MP3 (audio), and MPEG (video) are representative formats. Higher compression ratios result in greater quality degradation (artefacts).",
          },
          {
            term: "Lossless compression",
            def: "A compression method that allows data to be perfectly restored to its original form after decompression. Uses techniques such as Run-Length Encoding (RLE) and Huffman coding, which replace repeated patterns with shorter codes. PNG (images), FLAC (audio), and ZIP (files) are representative formats. Essential for data such as text and program code where information loss is not acceptable.",
          },
          {
            term: "Run-Length Encoding (RLE)",
            def: "A lossless compression technique that replaces a run of consecutive identical values with a (value, count) pair. Example: AAAAAABBB → 6A3B. Particularly effective on data with many repeated values, such as images with large areas of solid colour or fax data.",
          },
        ],
        traps: [
          "In questions on lossy versus lossless compression, listing only file formats (JPEG, PNG) without explaining why that format was chosen earns only partial marks. A high-scoring IB answer should state the reasoning and the risk: for example, 'Medical images and text files cannot tolerate information loss, so lossless compression (PNG, ZIP) must be used. Using JPEG lossy compression could remove subtle brightness differences and cause diagnostic errors.'",
          "Using bandwidth as a synonym for transmission speed will cost you marks. Bandwidth is the 'maximum capacity'; throughput is 'the amount actually delivered.' Make the contrast explicit with a sentence such as: 'A link with 100 Mbps bandwidth may have an actual throughput of only 70 Mbps due to congestion.'",
        ],
        example:
          "Let's calculate lossless compression with RLE directly. Suppose one scan line of a black-and-white fax image reads as follows (W = white, B = black): WWWWWWBBBBWWWWWWWWWWBB. Original: 22 characters. Applying RLE → 6W 4B 10W 2B. Compressed result: 8 tokens (number + character pairs), a reduction of approximately 63% in data size. Note that RLE can actually increase file size on random data with few repeats (e.g. an encrypted file), so compression algorithms must be chosen to match the characteristics of the data.",
      },
      {
        title: "Encryption and Network Security",
        subtitle:
          "Eavesdropping, intrusion, and malware — the principles of encryption, authentication, and firewalls against three threats",
        terms: [
          {
            term: "Symmetric encryption",
            def: "A method that uses the same key (secret key) for both encryption and decryption. AES (Advanced Encryption Standard) is the most common example. Faster than asymmetric encryption, but the key distribution problem — how to exchange the key securely — is a significant challenge. Primarily used for encrypting large volumes of data.",
          },
          {
            term: "Asymmetric encryption (public-key encryption)",
            def: "A method that encrypts with a public key and decrypts with a private key. The public key can be shared openly without compromising security. RSA is the representative algorithm; it is used during the TLS handshake in HTTPS to securely exchange a symmetric session key. Computationally slower than symmetric encryption.",
          },
          {
            term: "Firewall",
            def: "A security system at the network boundary that permits or blocks incoming and outgoing traffic according to predefined rules. Types include packet filtering (based on IP address and port number), stateful inspection, and application-layer firewalls. Serves as the first line of defence against external intrusion.",
          },
          {
            term: "Malware (malicious software)",
            def: "A collective term for software designed to infiltrate and damage a computer system without authorisation. Includes viruses (self-replicating, requires a host), worms (self-replicating, propagates independently), Trojan horses (disguised as legitimate software), and ransomware (encrypts files and demands payment).",
          },
        ],
        traps: [
          "Writing that 'the public key is used for decryption' in asymmetric encryption is completely wrong. The public key is used only for encryption (or signature verification); decryption (or signature creation) must always use the private key. For top marks, also explain why HTTPS uses asymmetric encryption only to exchange a symmetric session key during the TLS handshake, then switches to symmetric encryption for the actual data (speed).",
          "Stating that a firewall 'blocks all malicious traffic' is an over-generalisation that IB examiners penalise. A firewall is a rule-based filter and cannot block malware that enters through permitted ports (e.g. email attachments). A balanced high-scoring answer must mention 'the limitations of firewalls' and 'the need for additional security layers such as anti-virus software and IDS.'",
        ],
        example:
          "Let's explain why HTTPS uses both symmetric and asymmetric encryption by tracing the TLS handshake. (1) The client connects to the server; the server sends its certificate containing its public key. (2) The client encrypts a random session key (symmetric key) with the server's public key and sends it. (3) Only the server can decrypt the session key using its private key. (4) All subsequent communication is conducted using symmetric encryption (AES) with the session key. Asymmetric encryption is used only for the key exchange (slow but secure key delivery); the bulk of data is handled by symmetric encryption (fast). This hybrid structure is the core of HTTPS.",
      },
      {
        title: "Protocols, Standards, and Interoperability",
        subtitle:
          "Why devices with different hardware and operating systems can communicate on the same network",
        terms: [
          {
            term: "Protocol",
            def: "A set of rules defining the method, format, and sequence for exchanging data on a network. Both sender and receiver must use the same protocol for communication to be possible. TCP, UDP, HTTP, DNS, FTP, and SMTP are representative examples; each protocol operates at a specific OSI layer.",
          },
          {
            term: "Standard",
            def: "A technical specification established by standards bodies such as IEEE, IETF, and ISO to allow devices from different manufacturers and platforms to work together. Examples: IEEE 802.11 (Wi-Fi), IEEE 802.3 (Ethernet), and the TCP/IP protocol stack defined in RFC documents. Without standards, each manufacturer would use a proprietary protocol, destroying interoperability.",
          },
          {
            term: "Interoperability",
            def: "The ability of different systems, devices, and software to communicate smoothly and exchange data through common standards and protocols. Open standards are the foundation of interoperability.",
          },
        ],
        traps: [
          "Using protocol and standard as synonyms will cost you marks. A protocol is a 'set of communication rules (how)' — e.g. TCP, HTTP — while a standard is an 'openly adopted technical specification (agreed specification)' — e.g. IEEE 802.11. A protocol can become a standard, but not all protocols are standards (proprietary protocols exist). In IB answers, distinguish the two concepts with separate definitions and examples.",
          "A common over-generalisation in interoperability questions is to write that 'standards make everything work.' Even with standards, interoperability can break down due to version-compatibility issues (e.g. the IPv4-to-IPv6 transition) or proprietary extensions. IB evaluation questions require a balanced discussion of both the 'advantages of standards' and their 'limitations' to score highly on analytical marks.",
        ],
        example:
          "Let's look at a historical case to see what problems arise without standards. Before the early internet (in the 1970s), each university and institution used its own proprietary network protocol. DEC's DECnet, IBM's SNA, and Xerox's XNS coexisted but could not communicate with one another. When ARPANET adopted TCP/IP as its standard in 1983, institutions using different hardware and operating systems could finally be joined into one network. The fact that today you can access the same website from any browser on any OS is the direct result of open standards — TCP/IP, HTTP, and DNS.",
      },
    ],
  },
];
