export const Images = {
  icon: {
    ram: require("../../assets/images/deityIcon/ram.png"),
    shiv: require("../../assets/images/deityIcon/shiv.png"),
    laxmi: require("../../assets/images/deityIcon/laxmi.png"),
    durga: require("../../assets/images/deityIcon/durga.png"),
    saraswati: require("../../assets/images/deityIcon/saraswati.png"),
    radha: require("../../assets/images/deityIcon/radha.png"),
    parvati: require("../../assets/images/deityIcon/parvati.png"),
    krishna: require("../../assets/images/deityIcon/krishna.png"),
    hanuman: require("../../assets/images/deityIcon/hanuman.png"),
    ganesh: require("../../assets/images/deityIcon/ganesh.png"),
    santoshi: require("../../assets/images/deityIcon/santoshi.png"),
  },
  deity: {
    ram: {
      ramSita: require("../../assets/images/deity/ram/ram_sita.png"),
    },
    laxmi: {
      laxmi: require("../../assets/images/deity/laxmi/laxmi_full.png"),
    },
    vishnu: {
      vishnu_1: require("../../assets/images/deity/vishnu/vishnu_1.png"),
    }
  },
  bg: {
    bg_lotus: require("../../assets/images/bg/lotus_highlight.png"),
    bg: require("../../assets/images/bg/bg.png"),
  },
  assets: {
    scripture_book: require("../../assets/images/icons/audio.png"),
  }
};

export const Bhajans = {
  "ganesh": [
    {
      id: "1",
      title: "Jai Ganesh Jai Ganesh Deva",
      artist: "Anuradha Paudwal, Lata Mangeshkar",
      image: Images.deity.ram.ramSita, // Using available image for now
      audio: require("../../assets/audio/om_jai_jagdish_hare.mp3"),
    },
    {
      id: "2",
      title: "Ganpati Bappa Morya",
      artist: "Sukhwinder Singh",
      image: Images.deity.ram.ramSita, // Using available image for now
      audio: require("../../assets/audio/om_jai_jagdish_hare.mp3"),
    },
    {
      id: "3",
      title: "Deva Shree Ganesha",
      artist: "Ajay Gogavale (from Agneepath)",
      image: Images.deity.ram.ramSita, // Using available image for now
      audio: require("../../assets/audio/om_jai_jagdish_hare.mp3"),
    },
    {
      id: "4",
      title: "Ganpati Apne Gaon Chale",
      artist: "Anup Jalota",
      image: Images.deity.ram.ramSita, // Using available image for now
      audio: require("../../assets/audio/om_jai_jagdish_hare.mp3"),
    },
    {
      id: "5",
      title: "Vakratunda Mahakaya",
      artist: "Shankar Mahadevan",
      image: Images.deity.ram.ramSita, // Using available image for now
      audio: require("../../assets/audio/om_jai_jagdish_hare.mp3"),
    }
  ],
  "shiv": [
    {
      id: "1",
      title: "Shiv Tandav Stotram",
      artist: "Shankar Mahadevan",
      image: Images.deity.ram.ramSita, // Using available image for now
      audio: require("../../assets/audio/om_jai_jagdish_hare.mp3"),
    },
    {
      id: "2",
      title: "Bam Bam Bhole",
      artist: "Hansraj Raghuwansh",
      image: Images.deity.ram.ramSita, // Using available image for now
      audio: require("../../assets/audio/om_jai_jagdish_hare.mp3"),
    },
    {
      id: "3",
      title: "Har Har Shambhu",
      artist: "Abhilipsa Panda, Jeetu Sharma",
      image: Images.deity.ram.ramSita, // Using available image for now
      audio: require("../../assets/audio/om_jai_jagdish_hare.mp3"),
    },
    {
      id: "4",
      title: "Hey Shiv Shankar Hey Karunakar",
      artist: "Anuradha Paudwal",
      image: Images.deity.ram.ramSita, // Using available image for now
      audio: require("../../assets/audio/om_jai_jagdish_hare.mp3"),
    },
    {
      id: "5",
      title: "Shiv Amritvani",
      artist: "Hari Om Sharan",
      image: Images.deity.ram.ramSita, // Using available image for now
      audio: require("../../assets/audio/om_jai_jagdish_hare.mp3"),
    }
  ],
  "vishnu": [
    {
      id: "1",
      title: "Om Namo Bhagavate Vasudevaya",
      artist: "Lata Mangeshkar",
      image: Images.deity.vishnu.vishnu_1, // Fixed image reference
      audio: require("../../assets/audio/om_jai_jagdish_hare.mp3"),
    },
    {
      id: "2",
      title: "Shri Vishnu Chalisa",
      artist: "Anuradha Paudwal",
      image: Images.deity.ram.ramSita, // Using available image for now
      audio: require("../../assets/audio/om_jai_jagdish_hare.mp3"),
    },
    {
      id: "3",
      title: "Narayan Narayan Jai Govind Hare",
      artist: "Jagjit Singh",
      image: Images.deity.ram.ramSita, // Using available image for now
      audio: require("../../assets/audio/om_jai_jagdish_hare.mp3"),
    },
    {
      id: "4",
      title: "Govind Jai Jai Gopal Jai Jai",
      artist: "Lata Mangeshkar",
      image: Images.deity.ram.ramSita, // Using available image for now
      audio: require("../../assets/audio/om_jai_jagdish_hare.mp3"),
    }
  ],
  "krishna": [
    {
      id: "1",
      title: "Achyutam Keshavam",
      artist: "Vikram Hazra, Anuradha Paudwal",
      image: Images.deity.vishnu.vishnu_1, // Fixed image reference
      audio: require("../../assets/audio/om_jai_jagdish_hare.mp3"),
    },
    {
      id: "2",
      title: "Radhe Radhe Barsane Wali Radhe",
      artist: "Jagjit Singh",
      image: Images.deity.ram.ramSita, // Using available image for now
      audio: require("../../assets/audio/om_jai_jagdish_hare.mp3"),
    },
    {
      id: "3",
      title: "Yashomati Maiya Se Bole Nandlala",
      artist: "Lata Mangeshkar",
      image: Images.deity.ram.ramSita, // Using available image for now
      audio: require("../../assets/audio/om_jai_jagdish_hare.mp3"),
    },
    {
      id: "4",
      title: "Govind Bolo Hari Gopal Bolo",
      artist: "Lata Mangeshkar",
      image: Images.deity.ram.ramSita, // Using available image for now
      audio: require("../../assets/audio/om_jai_jagdish_hare.mp3"),
    },
    {
      id: "5",
      title: "Banke Bihari Tere Dwar",
      artist: "Kumar Vishu",
      image: Images.deity.ram.ramSita, // Using available image for now
      audio: require("../../assets/audio/om_jai_jagdish_hare.mp3"),
    }
  ],
  "ram": [
    {
      id: "1",
      title: "Shri Ram Chandra Kripalu",
      artist: "Jagjit Singh, Anuradha Paudwal",
      image: Images.deity.vishnu.vishnu_1, // Fixed image reference
      audio: require("../../assets/audio/om_jai_jagdish_hare.mp3"),
    },
    {
      id: "2",
      title: "Siya Ram May Sab Jag Jaani",
      artist: "Lata Mangeshkar",
      image: Images.deity.ram.ramSita, // Using available image for now
      audio: require("../../assets/audio/om_jai_jagdish_hare.mp3"),
    },
    {
      id: "3",
      title: "Ram Naam Ki Loot Hai",
      artist: "Hari Om Sharan",
      image: Images.deity.ram.ramSita, // Using available image for now
      audio: require("../../assets/audio/om_jai_jagdish_hare.mp3"),
    },
    {
      id: "4",
      title: "Ram Bhajan Kar Man",
      artist: "Anup Jalota",
      image: Images.deity.ram.ramSita, // Using available image for now
      audio: require("../../assets/audio/om_jai_jagdish_hare.mp3"),
    }
  ],
  "hanuman": [
    {
      id: "1",
      title: "Hanuman Chalisa",
      artist: "Hariharan, Gulshan Kumar, Anuradha Paudwal, Hari Om Sharan",
      image: Images.deity.vishnu.vishnu_1, // Fixed image reference
      audio: require("../../assets/audio/om_jai_jagdish_hare.mp3"),
    },
    {
      id: "2",
      title: "Sankat Mochan Naam Tiharo",
      artist: "Anuradha Paudwal",
      image: Images.deity.ram.ramSita, // Using available image for now
      audio: require("../../assets/audio/om_jai_jagdish_hare.mp3"),
    },
    {
      id: "3",
      title: "Bajrang Baan",
      artist: "Suresh Wadkar",
      image: Images.deity.ram.ramSita, // Using available image for now
      audio: require("../../assets/audio/om_jai_jagdish_hare.mp3"),
    },
    {
      id: "4",
      title: "Jai Hanuman Gyan Gun Sagar",
      artist: "Hari Om Sharan",
      image: Images.deity.ram.ramSita, // Using available image for now
      audio: require("../../assets/audio/om_jai_jagdish_hare.mp3"),
    }
  ],
  "durga": [
    {
      id: "1",
      title: "Ambe Tu Hai Jagdambe Kali",
      artist: "Narendra Chanchal",
      image: Images.deity.vishnu.vishnu_1, // Fixed image reference
      audio: require("../../assets/audio/om_jai_jagdish_hare.mp3"),
    },
    {
      id: "2",
      title: "Maiya Yashoda",
      artist: "Anuradha Paudwal",
      image: Images.deity.ram.ramSita, // Using available image for now
      audio: require("../../assets/audio/om_jai_jagdish_hare.mp3"),
    },
    {
      id: "3",
      title: "Durga Chalisa",
      artist: "Kavita Paudwal",
      image: Images.deity.ram.ramSita, // Using available image for now
      audio: require("../../assets/audio/om_jai_jagdish_hare.mp3"),
    },
    {
      id: "4",
      title: "Navratri specials",
      artist: "Narendra Chanchal",
      image: Images.deity.ram.ramSita, // Using available image for now
      audio: require("../../assets/audio/om_jai_jagdish_hare.mp3"),
    }
  ],
  "laxmi": [
    {
      id: "1",
      title: "Om Jai Lakshmi Mata",
      artist: "Lata Mangeshkar",
      image: Images.deity.vishnu.vishnu_1, // Fixed image reference
      audio: require("../../assets/audio/om_jai_jagdish_hare.mp3"),
    },
    {
      id: "2",
      title: "Lakshmi Chalisa",
      artist: "Kavita Paudwal",
      image: Images.deity.ram.ramSita, // Using available image for now
      audio: require("../../assets/audio/om_jai_jagdish_hare.mp3"),
    },
    {
      id: "3",
      title: "Mahalakshmi Ashtakam",
      artist: "Suresh Wadkar",
      image: Images.deity.ram.ramSita, // Using available image for now
      audio: require("../../assets/audio/om_jai_jagdish_hare.mp3"),
    },
    {
      id: "4",
      title: "Jai Lakshmi Mata",
      artist: "Kavita Paudwal",
      image: Images.deity.ram.ramSita, // Using available image for now
      audio: require("../../assets/audio/om_jai_jagdish_hare.mp3"),
    }
  ],
  "saraswati": [
    {
      id: "1",
      title: "Saraswati Vandana",
      artist: "Jagjit Singh",
      image: Images.deity.vishnu.vishnu_1, // Fixed image reference
      audio: require("../../assets/audio/om_jai_jagdish_hare.mp3"),
    },
    {
      id: "2",
      title: "Jai Jai Hey Bhagwati Saraswati Mata",
      artist: "Anuradha Paudwal",
      image: Images.deity.ram.ramSita, // Using available image for now
      audio: require("../../assets/audio/om_jai_jagdish_hare.mp3"),
    },
    {
      id: "3",
      title: "Saraswati Namasthubhyam",
      artist: "Suresh Wadkar",
      image: Images.deity.ram.ramSita, // Using available image for now
      audio: require("../../assets/audio/om_jai_jagdish_hare.mp3"),
    }
  ],
};

export const Aarti = {
  "ganesh": [
    {
      id: "1",
      title: "Jai Ganesh Jai Ganesh Deva",
      artist: "Anuradha Paudwal, Lata Mangeshkar",
      // image: Images.deity.vishnu.vishnu_1, // Fixed image reference
      // audio: require("../../assets/audio/om_jai_jagdish_hare.mp3"),
    },
    {
      id: "2",
      title: "Shendur Lal Chadhayo",
      artist: "Anuradha Paudwal, Ravindra Sathe",
      // image: Images.deity.ram.ramSita, // Using available image for now
      // audio: require("../../assets/audio/om_jai_jagdish_hare.mp3"),
    },
    {
      id: "3",
      title: "Vakratunda Mahakaya",
      artist: "Shankar Mahadevan",
      // image: Images.deity.ram.ramSita, // Using available image for now
      // audio: require("../../assets/audio/om_jai_jagdish_hare.mp3"),
    }
  ],
  "shiv": [
    {
      id: "1",
      title: "Om Jai Shiv Omkara",
      artist: "Hariharan, Anuradha Paudwal",
      // image: Images.deity.vishnu.vishnu_1, // Fixed image reference
      // audio: require("../../assets/audio/om_jai_jagdish_hare.mp3"),
    },
    {
      id: "2",
      title: "Jai Shiv Shankar Bhole Bhandari",
      artist: "Lata Mangeshkar",
      // image: Images.deity.ram.ramSita, // Using available image for now
      // audio: require("../../assets/audio/om_jai_jagdish_hare.mp3"),
    },
    {
      id: "3",
      title: "Shiv Tandav Stotram",
      artist: "Shankar Mahadevan, Amitabh Bachchan",
      // image: Images.deity.ram.ramSita, // Using available image for now
      // audio: require("../../assets/audio/om_jai_jagdish_hare.mp3"),
    },
    {
      id: "4",
      title: "Mera Bhola Hai Bhandari",
      artist: "Hansraj Raghuwanshi",
      // image: Images.deity.ram.ramSita, // Using available image for now
      // audio: require("../../assets/audio/om_jai_jagdish_hare.mp3"),
    }
  ],
  "vishnu": [
    {
      id: "1",
      title: "Om Jai Jagdish Hare",
      artist: "Anuradha Paudwal, Hari Om Sharan",
      // image: Images.deity.vishnu.vishnu_1, // Fixed image reference
      // audio: require("../../assets/audio/om_jai_jagdish_hare.mp3"),
    },
    {
      id: "2",
      title: "Shree Vishnu Aarti",
      artist: "Suresh Wadkar",
      // image: Images.deity.ram.ramSita, // Using available image for now
      // audio: require("../../assets/audio/om_jai_jagdish_hare.mp3"),
    },
    {
      id: "3",
      title: "Govind Bolo Hari Gopal Bolo",
      artist: "Lata Mangeshkar",
      // image: Images.deity.ram.ramSita, // Using available image for now
      // audio: require("../../assets/audio/om_jai_jagdish_hare.mp3"),
    }
  ],
  "krishna": [
    {
      id: "1",
      title: "Aarti Kunj Bihari Ki",
      artist: "Anup Jalota, Lata Mangeshkar",
      // image: Images.deity.vishnu.vishnu_1, // Fixed image reference
      // audio: require("../../assets/audio/om_jai_jagdish_hare.mp3"),
    },
    {
      id: "2",
      title: "Achyutam Keshavam",
      artist: "Anuradha Paudwal, Vikram Hazra",
      // image: Images.deity.ram.ramSita, // Using available image for now
      // audio: require("../../assets/audio/om_jai_jagdish_hare.mp3"),
    },
    {
      id: "3",
      title: "Shree Krishna Govind Hare Murari",
      artist: "Lata Mangeshkar, Jagjit Singh",
      // image: Images.deity.ram.ramSita, // Using available image for now
      // audio: require("../../assets/audio/om_jai_jagdish_hare.mp3"),
    }
  ],
  "ram": [
    {
      id: "1",
      title: "Om Jai Ramchandra Hare",
      artist: "Anuradha Paudwal",
      // image: Images.deity.vishnu.vishnu_1, // Fixed image reference
      // audio: require("../../assets/audio/om_jai_jagdish_hare.mp3"),
    },
    {
      id: "2",
      title: "Ramchandra Kripalu Bhajman",
      artist: "Jagjit Singh, Anup Jalota",
      // image: Images.deity.ram.ramSita, // Using available image for now
      // audio: require("../../assets/audio/om_jai_jagdish_hare.mp3"),
    },
    {
      id: "3",
      title: "Siya Ram May Bhaj Pyaare",
      artist: "Kavita Paudwal",
      // image: Images.deity.ram.ramSita, // Using available image for now
      // audio: require("../../assets/audio/om_jai_jagdish_hare.mp3"),
    }
  ],
  "hanuman": [
    {
      id: "1",
      title: "Aarti Bajrang Bali Ki",
      artist: "Hari Om Sharan",
      // image: Images.deity.vishnu.vishnu_1, // Fixed image reference
      // audio: require("../../assets/audio/om_jai_jagdish_hare.mp3"),
    },
    {
      id: "2",
      title: "Om Jai Hanumanta Sant Hitkaari",
      artist: "Anuradha Paudwal",
      // image: Images.deity.ram.ramSita, // Using available image for now
      // audio: require("../../assets/audio/om_jai_jagdish_hare.mp3"),
    },
    {
      id: "3",
      title: "Hanuman Chalisa",
      artist: "Hariharan, Gulshan Kumar, Anuradha Paudwal, Hari Om Sharan",
      // image: Images.deity.ram.ramSita, // Using available image for now
      // audio: require("../../assets/audio/om_jai_jagdish_hare.mp3"),
    }
  ],
  "durga": [
    {
      id: "1",
      title: "Jai Ambe Gauri",
      artist: "Anuradha Paudwal, Lata Mangeshkar",
      // image: Images.deity.vishnu.vishnu_1, // Fixed image reference
      // audio: require("../../assets/audio/om_jai_jagdish_hare.mp3"),
    },
    {
      id: "2",
      title: "Ambe Tu Hai Jagdambe Kali",
      artist: "Narendra Chanchal, Lata Mangeshkar",
      // image: Images.deity.ram.ramSita, // Using available image for now
      // audio: require("../../assets/audio/om_jai_jagdish_hare.mp3"),
    },
    {
      id: "3",
      title: "Durga Aarti (Sarva Mangal Mangalye)",
      artist: "Suresh Wadkar",
      // image: Images.deity.ram.ramSita, // Using available image for now
      // audio: require("../../assets/audio/om_jai_jagdish_hare.mp3"),
    }
  ],
  "laxmi": [
    {
      id: "1",
      title: "Om Jai Lakshmi Mata",
      artist: "Anuradha Paudwal, Lata Mangeshkar",
      // image: Images.deity.vishnu.vishnu_1, // Fixed image reference
      // audio: require("../../assets/audio/om_jai_jagdish_hare.mp3"),
    },
    {
      id: "2",
      title: "Mahalaxmi Aarti",
      artist: "Suresh Wadkar",
      // image: Images.deity.ram.ramSita, // Using available image for now
      // audio: require("../../assets/audio/om_jai_jagdish_hare.mp3"),
    },
    {
      id: "3",
      title: "Lakshmi Chalisa",
      artist: "Kavita Paudwal",
      // image: Images.deity.ram.ramSita, // Using available image for now
      // audio: require("../../assets/audio/om_jai_jagdish_hare.mp3"),
    }
  ],
  "saraswati": [
    {
      id: "1",
      title: "Jai Jai He Bhagwati Saraswati Mata",
      artist: "Anuradha Paudwal",
      // image: Images.deity.vishnu.vishnu_1, // Fixed image reference
      // audio: require("../../assets/audio/om_jai_jagdish_hare.mp3"),
    },
    {
      id: "2",
      title: "Saraswati Vandana",
      artist: "Jagjit Singh",
      // image: Images.deity.ram.ramSita, // Using available image for now
      // audio: require("../../assets/audio/om_jai_jagdish_hare.mp3"),
    }
  ],
  "kali": [
    {
      id: "1",
      title: "Jai Kali Maa Aarti",
      artist: "Anuradha Paudwal",
      // image: Images.deity.vishnu.vishnu_1, // Fixed image reference
      // audio: require("../../assets/audio/om_jai_jagdish_hare.mp3"),
    },
    {
      id: "2",
      title: "Kali Durge Namo Namah",
      artist: "Kavita Paudwal",
      // image: Images.deity.ram.ramSita, // Using available image for now
      // audio: require("../../assets/audio/om_jai_jagdish_hare.mp3"),
    }
  ],
};

export const Slokas = {
  "ganesh": [
    {
      "id": "1",
      "title": "Vakratunda Mahakaya",
      "shloka": "वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ ।\nनिर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा ॥",
      // "audio": require("../../assets/audio/vakratunda_mahakaya.mp3")
    },
    {
      "id": "2",
      "title": "Ganapati Atharvashirsha",
      "shloka": "त्वं मूलाधार स्थितोऽसि नित्यम् ।\nत्वं शक्तित्रयात्मकः ।\nत्वां योगिनो ध्यायन्ति नित्यम् ॥",
      // "audio": require("../../assets/audio/ganapati_atharvashirsha.mp3")
    }
  ],
  "shiva": [
    {
      "id": "1",
      "title": "Mahamrityunjaya Mantra",
      "shloka": "ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम् ।\nउर्वारुकमिव बन्धनान् मृत्योर्मुक्षीय मामृतात् ॥",
        // "audio": require("../../assets/audio/mahamrityunjaya_mantra.mp3")
    },
    {
      "id": "2",
      "title": "Shiva Dhyan Mantra",
      "shloka": "करचरण कृतं वाक्कायजं कर्मजं वा\nश्रवणनयनजं वा मानसं वापराधम् ।\nविहितमविहितं वा सर्वमेतत्क्षमस्व\nजय जय करुणाब्धे श्रीमहादेव शम्भो ॥"
    }
  ],
  "vishnu": [
    {
      "id": "1",
      "title": "Vishnu Gayatri Mantra",
      "shloka": "ॐ नारायणाय विद्महे वासुदेवाय धीमहि ।\nतन्नो विष्णुः प्रचोदयात् ॥"
    },
    {
      "id": "2",
      "title": "Shantakaram Bhujagashayanam",
      "shloka": "शान्ताकारं भुजगशयनं पद्मनाभं सुरेशं\nविश्वाधारं गगनसदृशं मेघवर्णं शुभाङ्गम् ।\nलक्ष्मीकान्तं कमलनयनं योगिभिर्ध्यानगम्यम्\nवन्दे विष्णुं भवभयहरं सर्वलोकैकनाथम् ॥"
    }
  ],
  "krishna": [
    {
      "id": "1",
      "title": "Krishna Gayatri Mantra",
      "shloka": "ॐ देवकीनन्दनाय विद्महे वासुदेवाय धीमहि ।\nतन्नः कृष्णः प्रचोदयात् ॥"
    },
    {
      "id": "2",
      "title": "Govindam Adi Purusham",
      "shloka": "गोविन्दं आदि पुरुषं तमहं भजामि ॥"
    }
  ],
  "rama": [
    {
      "id": "1",
      "title": "Shri Rama Rama Rameti",
      "shloka": "श्रीराम राम रामेति रमे रामे मनोरमे ।\nसहस्रनाम तत्तुल्यं रामनाम वरानने ॥"
    },
    {
      "id": "2",
      "title": "Ram Gayatri Mantra",
      "shloka": "ॐ दशरथाय विद्महे सीतावल्लभाय धीमहि ।\nतन्नो रामः प्रचोदयात् ॥"
    }
  ],
  "hanuman": [
    {
      "id": "1",
      "title": "Hanuman Gayatri Mantra",
      "shloka": "ॐ आञ्जनेयाय विद्महे वायुपुत्राय धीमहि ।\nतन्नो हनुमत् प्रचोदयात् ॥"
    },
    {
      "id": "2",
      "title": "Shri Hanuman Mool Mantra",
      "shloka": "ॐ नमो हनुमते रुद्रावताराय विशालवक्त्राय\nदिव्यशक्तिसम्पन्नाय सीतादेवी मुद्राप्रदायकाय\nकपिश्रेष्ठाय अञ्जनीसुताय नमः ॥"
    }
  ],
  "durga": [
    {
      "id": "1",
      "title": "Ya Devi Sarvabhuteshu",
      "shloka": "या देवी सर्वभूतेषु शक्तिरूपेण संस्थिता ।\nनमस्तस्यै नमस्तस्यै नमस्तस्यै नमो नमः ॥"
    },
    {
      "id": "2",
      "title": "Durga Gayatri Mantra",
      "shloka": "ॐ कात्यायनाय विद्महे कन्याकुमारि धीमहि ।\nतन्नो दुर्गिः प्रचोदयात् ॥"
    }
  ],
  "lakshmi": [
    {
      "id": "1",
      "title": "Mahalakshmi Ashtakam",
      "shloka": "नमस्तेऽस्तु महामाये श्रीपीठे सुरपूजिते ।\nशङ्खचक्रगदाहस्ते महालक्ष्मि नमोऽस्तुते ॥"
    },
    {
      "id": "2",
      "title": "Lakshmi Gayatri Mantra",
      "shloka": "ॐ महालक्ष्म्यै च विद्महे विष्णुपत्नी च धीमहि ।\nतन्नो लक्ष्मीः प्रचोदयात् ॥"
    }
  ],
  "saraswati": [
    {
      "id": "1",
      "title": "Saraswati Vandana",
      "shloka": "या कुन्देन्दुतुषारहारधवला या शुभ्रवस्त्रावृता ।\nया वीणावरदण्डमण्डितकरा या श्वेतपद्मासना ॥"
    },
    {
      "id": "2",
      "title": "Saraswati Gayatri Mantra",
      "shloka": "ॐ वाग्देव्यै च विद्महे कामराजाय धीमहि ।\nतन्नः सरस्वती प्रचोदयात् ॥"
    }
  ],
  "kali": [
    {
      "id": "1",
      "title": "Kali Gayatri Mantra",
      "shloka": "ॐ कालिकायै विद्महे चामुण्डायै धीमहि ।\nतन्नः काली प्रचोदयात् ॥"
    },
    {
      "id": "2",
      "title": "Kali Mool Mantra",
      "shloka": "ॐ ह्लीं क्लीं कालिकायै नमः ॥"
    }
  ]
};

export const Mantras = {
  "ganesh": [{
    "id": "1",
    "title": "Vakratunda Mahakaya",
    "shloka": "वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ ।\nनिर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा ॥",
    "english": "Vakratunda Mahakaya Suryakoti Samaprabha  \n Nirvighnam Kuru Me Deva Sarva-Kaaryeshu Sarvada"
  },{
    "id": "2",
    "title": "Om Gam Ganapataye Namah",
    "shloka": "ॐ गं गणपतये नमः॥",
    "english": "Om Gam Ganapataye Namah"
  }],
  "shiv": [{
    "id": "1",
    "title": "Mahamrityunjaya Mantra",
    "shloka": "ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम्।\n उर्वारुकमिव बन्धनान्मृत्योर्मुक्षीय माऽमृतात्॥",
    "english": "Om Tryambakam Yajamahe Sugandhim Pushtivardhanam  \n Urvarukamiva Bandhanan Mrityor Mukshiya Maamritat"
  },{
    "id": "2",
    "title": "Om Namah Shivaya",
    "shloka": "ॐ नमः शिवाय॥",
    "english": "Om Namah Shivaya"
  }],
  "vishnu": [{
    "id": "1",
    "title": "Om Namo Bhagavate Vasudevaya",
    "shloka": "ॐ नमो भगवते वासुदेवाय॥",
    "english": "Om Namo Bhagavate Vasudevaya"
  },{
    "id": "2",
    "title": "Vishnu Gayatri Mantra",
    "shloka": "ॐ नारायणाय विद्महे वासुदेवाय धीमहि।\n तन्नो विष्णुः प्रचोदयात्॥",
    "english": "Om Narayanaya Vidmahe Vasudevaya Dhimahi  \n Tanno Vishnuh Prachodayat"
  }],
  "hanuman": [{
    "id": "1",
    "title": "Hanuman Beej Mantra",
    "shloka": "ॐ हं हनुमते रुद्रात्मकाय हुं फट्॥",
    "english": "Om Ham Hanumate Rudratmakaya Hum Phat"
  },{
    "id": "2",
    "title": "Hanuman Gayatri Mantra",
    "shloka": "ॐ आञ्जनेयाय विद्महे वायुपुत्राय धीमहि।\n तन्नो हनुमान् प्रचोदयात्॥",
    "english": "Om Anjaneyaya Vidmahe Vayuputraya Dhimahi  \n Tanno Hanuman Prachodayat"
  }],
  "krishna": [{
    "id": "1",
    "title": "Hare Krishna Mahamantra",
    "shloka": "हरे कृष्ण हरे कृष्ण कृष्ण कृष्ण हरे हरे।  \n हरे राम हरे राम राम राम हरे हरे॥",
    "english": "Hare Krishna Hare Krishna Krishna Krishna Hare Hare  \n Hare Rama Hare Rama Rama Rama Hare Hare"
  },{
    "id": "2",
    "title": "Shri Krishna Govind Hare Murari",
    "shloka": "श्रीकृष्ण गोविन्द हरे मुरारे।  \n हे नाथ नारायण वासुदेव॥",
    "english": "Shri Krishna Govind Hare Murari  \n He Nath Narayan Vasudev"
  }],
  "durga": [{
    "id": "1",
    "title": "Navarna Mantra",
    "shloka": "ॐ ऐं ह्रीं क्लीं चामुण्डायै विच्चे॥",
    "english": "Om Aim Hreem Kleem Chamundayai Vichche"
  },{
    "id": "2",
    "title": "Durga Gayatri Mantra",
    "shloka": "शॐ कात्यायनाय विद्महे कन्यकुमारि धीमहि।\n तन्नो दुर्गिः प्रचोदयात्॥",
    "english": "Om Katyayanaya Vidmahe Kanyakumari Dhimahi  \n Tanno Durgih Prachodayat"
  }],
  "laxmi": [{
    "id": "1",
    "title": "Shree Mahalakshmi Beej Mantra",
    "shloka": "ॐ श्रीं महालक्ष्म्यै नमः॥",
    "english": "Om Shreem Mahalakshmyai Namah"
  },{
    "id": "2",
    "title": "Shree Suktam",
    "shloka": "ॐ हिरण्यवर्णां हरिणीं सुवर्णरजतस्रजाम्।\n चन्द्रां हिरण्मयीं लक्ष्मीं जातवेदो म आवह॥",
    "english": "Om Hiranya Varnam Harinim Suvarna Rajatasrajam  \n Chandram Hiranyam Lakshmim Jatavedo Ma Avaha"
  }],
  "saraswati": [{
    "id": "1",
    "title": "Saraswati Vandana",
    "shloka": "या कुन्देन्दुतुषारहारधवला या शुभ्रवस्त्रावृता।  \n या वीणावरदण्डमण्डितकरा या श्वेतपद्मासना"
  },{
    "id": "2",
    "title": "Saraswati Beej Mantra",
    "shloka": "ॐ ऐं सरस्वत्यै नमः॥",
    "english": "Om Aim Saraswatyai Namah"
  }],
  "shani": [{
    "id": "1",
    "title": "Shani Beej Mantra",
    "shloka": "ॐ प्रां प्रीं प्रौं सः शनैश्चराय नमः॥",
    "english": "Om Praam Preem Praum Sah Shanaischaraya Namah"
  },{
    "id": "2",
    "title": "Shani Gayatri Mantra",
    "shloka": "ॐ काकध्वजाय विद्महे खड्गहस्ताय धीमहि।\n तन्नः मन्दः प्रचोदयात्॥",
    "english": "Om Kakadhvajaya Vidmahe Khadga Hastaya Dhimahi  \n Tanno Mandah Prachodayat"
  }]
}

export const Kirtans = {
  "ganesh": [
    {
      "id": "1",
      "title": "Ganpati Bappa Morya",
      "artist": "Shankar Mahadevan"
    },
    {
      "id": "2",
      "title": "Sukhkarta Dukhharta",
      "artist": "Lata Mangeshkar"
    },
    {
      "id": "3",
      "title": "Jai Ganesh Jai Ganesh Deva",
      "artist": "Anuradha Paudwal"
    }
  ],
  "shiv": [
    {
      "id": "1",
      "title": "Shiv Tandav Stotram",
      "artist": "Ravindra Sathe"
    },
    {
      "id": "2",
      "title": "Bam Bam Bhole",
      "artist": "Hansraj Raghuwanshi"
    },
    {
      "id": "3",
      "title": "Om Namah Shivaya",
      "artist": "Suresh Wadkar"
    }
  ],
  "krishna": [
    {
      "id": "1",
      "title": "Achyutam Keshavam",
      "artist": "Anuradha Paudwal"
    },
    {
      "id": "2",
      "title": "Shri Krishna Govind Hare Murari",
      "artist": "Lata Mangeshkar"
    },
    {
      "id": "3",
      "title": "Govind Bolo Hari Gopal Bolo",
      "artist": "Anup Jalota"
    }
  ],
  "hanuman": [
    {
      "id": "1",
      "title": "Jai Hanuman Gyan Gun Sagar",
      "artist": "Hari Om Sharan"
    },
    {
      "id": "2",
      "title": "Bajrang Baan",
      "artist": "Anuradha Paudwal"
    },
    {
      "id": "3",
      "title": "Hanuman Chalisa",
      "artist": "Hariharan"
    }
  ],
  "durga": [
    {
      "id": "1",
      "title": "Ambe Tu Hai Jagdambe Kali",
      "artist": "Anuradha Paudwal"
    },
    {
      "id": "2",
      "title": "Durga Chalisa",
      "artist": "Anuradha Paudwal"
    },
    {
      "id": "3",
      "title": "Maa Durga Sherawali",
      "artist": "Lakhbir Singh Lakkha"
    }
  ],
  "lakshmi": [
    {
      "id": "1",
      "title": "Mahalaxmi Aarti",
      "artist": "Lata Mangeshkar"
    },
    {
      "id": "2",
      "title": "Shree Lakshmi Narayan",
      "artist": "Anuradha Paudwal"
    },
    {
      "id": "3",
      "title": "Om Jai Lakshmi Mata",
      "artist": "Anuradha Paudwal"
    }
  ],
  "saraswati": [
    {
      "id": "1",
      "title": "Saraswati Vandana",
      "artist": "Anuradha Paudwal"
    },
    {
      "id": "2",
      "title": "Hey Sharde Maa",
      "artist": "Lata Mangeshkar"
    }
  ],
  "ram": [
    {
      "id": "1",
      "title": "Shri Ram Chandra Kripalu Bhajman",
      "artist": "Anuradha Paudwal"
    },
    {
      "id": "2",
      "title": "Raghupati Raghav Raja Ram",
      "artist": "Lata Mangeshkar"
    },
    {
      "id": "3",
      "title": "Ram Siya Ram Siya Ram Jai Jai Ram",
      "artist": "Jagjit Singh"
    },
    {
      "id": "4",
      "title": "Jai Jai Ram Krishna Hari",
      "artist": "Shivam Pathak"
    }
  ],
  "radha": [
    {
      "id": "1",
      "title": "Radhe Radhe Japo Chale Aayenge Bihari",
      "artist": "Lata Mangeshkar"
    },
    {
      "id": "2",
      "title": "Shyam Teri Bansi Pukare Radha Naam",
      "artist": "Anuradha Paudwal"
    },
    {
      "id": "3",
      "title": "Radha Rani Lage Pyari",
      "artist": "Hansraj Raghuwanshi"
    }
  ],
  "parvati": [
    {
      "id": "1",
      "title": "Parvati Bolo Shankar Se Milan Hoga",
      "artist": "Anuradha Paudwal"
    },
    {
      "id": "2",
      "title": "Hey Girija Ke Lal",
      "artist": "Lakhbir Singh Lakkha"
    },
    {
      "id": "3",
      "title": "Jai Jai Bhavani Maa",
      "artist": "Anuradha Paudwal"
    }
  ],
  "santoshi": [
    {
      "id": "1",
      "title": "Jai Santoshi Mata",
      "artist": "Usha Mangeshkar"
    },
    {
      "id": "2",
      "title": "Santoshi Mata Ki Aarti",
      "artist": "Unknown"
    },
    {
      "id": "3",
      "title": "Santoshi Mata Bhajan",
      "artist": "Various Artists"
    }
  ]
}

export const Pravachan = {
  "ram": [
    {
      "id": "1",
      "title": "Shri Ram Katha",
      "speaker": "Morari Bapu",
      "duration": "20:00:00",
      "theme": "Ramayana - Life and Teachings of Shri Ram"
    },
    {
      "id": "2",
      "title": "Maryada Purushottam Ram",
      "speaker": "Gaur Gopal Das",
      "duration": "01:30:00",
      "theme": "Ideal Character and Leadership"
    }
  ],
  "radha_krishna": [
    {
      "id": "1",
      "title": "Prem Ras Madira Pravachan",
      "speaker": "Kripalu Ji Maharaj",
      "duration": "10:00:00",
      "theme": "Divine Love of Radha Krishna"
    },
    {
      "id": "2",
      "title": "Bhagavat Katha",
      "speaker": "Devi Chitralekha",
      "duration": "15:00:00",
      "theme": "Stories from Shrimad Bhagavatam"
    }
  ],
  "shiva_parvati": [
    {
      "id": "1",
      "title": "Shiv Mahapuran Katha",
      "speaker": "Pandit Pradeep Mishra",
      "duration": "20:00:00",
      "theme": "Shiv Purana and Parvati's devotion"
    },
    {
      "id": "2",
      "title": "Ardhanarishwar Tattva",
      "speaker": "Sadguru",
      "duration": "01:00:00",
      "theme": "Balance of masculine and feminine energy"
    }
  ],
  "santoshi": [
    {
      "id": "1",
      "title": "Santoshi Mata Vrat Katha",
      "speaker": "Local Pujaris / Recorded Audio",
      "duration": "00:30:00",
      "theme": "Significance of Friday Vrat and Katha"
    }
  ],
  "ganesh": [
        {
        "id": "1",
        "title": "Ganesh Chaturthi Katha",
        "speaker": "Pandit Ramesh Bhai Oza",
        "duration": "02:00:00",
        "theme": "Significance of Ganesh Chaturthi and Lord Ganesha's life"
        },
        {
        "id": "2",
        "title": "Vinayaka Chaturthi Pravachan",
        "speaker": "Sadhguru Jaggi Vasudev",
        "duration": "01:30:00",
        "theme": "Spiritual significance of Lord Ganesha"
        }
    ],
  "shani": [
        {
        "id": "1",
        "title": "Shani Mahatmya Katha",
        "speaker": "Pandit Pradeep Mishra",
        "duration": "01:00:00",
        "theme": "Understanding Shani's influence and remedies"
        },
        {
        "id": "2",
        "title": "Shani Shingnapur Katha",
        "speaker": "Local Pujaris / Recorded Audio",
        "duration": "00:30:00",
        "theme": "Significance of Shani Shingnapur temple"
        }
    ],
  "lakshmi": [
    {
      "id": "1",
      "title": "Mahalakshmi Vrat Mahatmya",
      "speaker": "Ashwin Pathak",
      "duration": "00:45:00",
      "theme": "Importance of Lakshmi Vrat for prosperity"
    },
    {
      "id": "2",
      "title": "Devi Lakshmi Tattva",
      "speaker": "Sadguru",
      "duration": "01:10:00",
      "theme": "Inner abundance and grace"
    }
  ],
  "durga": [
    {
      "id": "1",
      "title": "Durga Saptashati Katha",
      "speaker": "Swami Mukundananda",
      "duration": "06:00:00",
      "theme": "Glory of Goddess Durga from Markandeya Purana"
    },
    {
      "id": "2",
      "title": "Navratri Mahatmya",
      "speaker": "Devi Chitralekha",
      "duration": "03:00:00",
      "theme": "Significance and rituals of Navratri"
    }
  ],
  "saraswati": [
    {
      "id": "1",
      "title": "Saraswati Mahima",
      "speaker": "Pandit Vijay Kaushal Ji",
      "duration": "01:20:00",
      "theme": "Goddess of knowledge and wisdom"
    },
    {
      "id": "2",
      "title": "Vaani Aur Vidya",
      "speaker": "Sadhvi Bhagawati Saraswati",
      "duration": "00:50:00",
      "theme": "Importance of pure speech and learning"
    }
  ],
  "hanuman": [
    {
      "id": "1",
      "title": "Sankat Mochan Hanuman Katha",
      "speaker": "Morari Bapu",
      "duration": "10:00:00",
      "theme": "Stories of Hanuman’s devotion and power"
    },
    {
      "id": "2",
      "title": "Hanuman Bhakti Tattva",
      "speaker": "Shri Rajan Ji Maharaj",
      "duration": "01:30:00",
      "theme": "Path of selfless devotion and strength"
    }
  ]
}

export const BhagwanScroller = [
  "ram", "shiv", "lakshmi", "durga", "saraswati", "radha", "parvati", "krishna", "hanuman", "ganesh", "santoshi"
];

export default Images;