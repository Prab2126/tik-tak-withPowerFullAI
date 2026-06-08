function playSound(path: string) {
  const audio: HTMLAudioElement = new Audio(path);
  audio.play();
}

export default playSound;
