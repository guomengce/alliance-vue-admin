<template>
  <div class="auth-brand">
    <div class="auth-brand__mark">
      <el-icon><CircleCheckFilled /></el-icon>
    </div>
    <div>
      <h1>ALLIANCE SYSTEM</h1>
      <p>SECURE MEMBER ACCESS</p>
    </div>
  </div>
</template>

<script setup>
import { CircleCheckFilled } from '@element-plus/icons-vue';
</script>

<style scoped lang="scss">
.auth-brand {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  color: #fff;
  text-align: left;
}

.auth-brand__mark {
  width: 36px;
  height: 36px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  background: linear-gradient(135deg, #6750a4, #cfbcff);
  color: #fff;
}

h1 {
  margin: 0;
  color: #fff;
  font-size: 22px;
  font-weight: 900;
  letter-spacing: 0.03em;
}

p {
  margin: 4px 0 0;
  color: rgba(203, 196, 210, 0.52);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.22em;
}

@media (max-width: 420px) {
  h1 {
    font-size: 18px;
  }
}
</style>
