<template>
  <div id="app">
    <ul class="nav justify-content-center bg-light mb-3" id="nav">
      <li class="nav-item">
        <div class="balls">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </li>
      <li class="nav-item">
        <router-link to="/" class="nav-link">
          <span>Home</span>
        </router-link>
      </li>
      <li class="nav-item">
        <router-link to="/about" class="nav-link">
          <span>About</span>
        </router-link>
      </li>
      <li class="nav-item">
        <router-link to="/posts" class="nav-link">
          <span>Posts</span>
        </router-link>
      </li>
    </ul>

    <router-view />
  </div>
</template>

<style>
#nav .nav-link {
  color: #000;
}
#nav a.router-link-exact-active {
  color: #42b983;
}
.bg-vue {
  background-color: #42b983 !important;
}
span {
  position: relative;
}

span::before,
span::after {
  content: "";
  position: absolute;
  left: 50%;
  width: 100%;
  height: 2px;
  background-color: #42b983;
  transform-origin: center;
  transform: translateX(-50%) scaleX(0);
  transition: transform 0.4s ease;
}

span::before {
  top: -5px;
}

span::after {
  bottom: -5px;
}

span:hover::before,
span:hover::after {
  transform: translateX(-50%) scaleX(1);
}

.balls {
  width: 3.5em;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
}

.balls div {
  width: 0.8em;
  height: 0.8em;
  border-radius: 50%;
  background-color: #fc2f70;
  transform: translateY(-100%);
  animation: wave 0.8s ease-in-out alternate infinite;
}

.balls div:nth-of-type(1) {
  animation-delay: -0.4s;
}

.balls div:nth-of-type(2) {
  animation-delay: -0.2s;
}

@keyframes wave {
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(100%);
  }
}
</style>
