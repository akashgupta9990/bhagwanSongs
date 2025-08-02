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

export const Bhajans = [
  {
    id: "1",
    title: "Om Jai Jagdish Hare",
    artist: "Anuradha Paudwal",
    deity: "vishnu",
    image: Images.deity.vishnu.vishnu_1, // Fixed image reference
    audio: require("../../assets/audio/om_jai_jagdish_hare.mp3"),
  },
  {
    id: "2",
    title: "Shiv Tandav Stotram",
    artist: "Ravindra Sathe",
    name: "shiv",
    image: Images.deity.ram.ramSita, // Using available image for now
    audio: require("../../assets/audio/om_jai_jagdish_hare.mp3"),
  },
  {
    id: "3",
    title: "Hanuman Chalisa",
    artist: "Hariharan",
    name: "hanuman",
    image: Images.deity.ram.ramSita, // Using available image for now
    audio: require("../../assets/audio/om_jai_jagdish_hare.mp3"),
  },
];

export const BhagwanScroller = [
  "ram", "shiv", "laxmi", "durga", "saraswati", "radha", "parvati", "krishna", "hanuman", "ganesh", "santoshi"
];

export default Images;