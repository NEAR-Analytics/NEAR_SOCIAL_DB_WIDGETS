State.init({time: Date.now(), interval: false})

if(!state.interval){
  setInterval(() => State.update({time: Date.now()}), "2000");
  State.update({interval: true})
}

return (
  <div class="card text-center">
    <div class="card-body">
      <h6 class="card-subtitle mb-2 text-muted">Countdown to 1B wallets</h6>
      <h3 class="card-title">
        {
          (Math.round(-0.00022726990254027382 * state.time + 1357725846.055349))
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
        }
      </h3>
      <p class="card-text small">Lets work together to bring more users!</p>
    </div>
  </div>
);