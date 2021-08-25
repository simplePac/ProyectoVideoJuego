window.onload = () => {
    document.getElementById("start-button").onclick = () => {
      const canvas = document.querySelector("#canvas");
      myTrueGame.init(canvas);
      document.getElementById("logo").remove();
      document.getElementsByClassName("titulo")[0].remove();
      document.getElementById("start-button").innerHTML = "Restart";
      document.getElementById("start-button").onclick = () => {
        location.reload();
      };
    };
  };