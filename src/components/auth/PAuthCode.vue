<template>
  <div>
    <canvas
      id="s-canvas"
      :width="contentWidth"
      :height="contentHeight"
    ></canvas>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";

@Component
export default class PAuthCode extends Vue {
  @Prop({ type: String, default: "0000" })
  identifyCode!: string;

  @Prop({ type: Number, default: 25 })
  fontSizeMin!: number;

  @Prop({ type: Number, default: 35 })
  fontSizeMax!: number;

  @Prop({ type: Number, default: 200 })
  backgroundColorMin!: number;

  @Prop({ type: Number, default: 220 })
  backgroundColorMax!: number;

  @Prop({ type: Number, default: 60 })
  dotColorMin!: number;

  @Prop({ type: Number, default: 120 })
  dotColorMax!: number;

  @Prop({ type: Number, default: 120 })
  contentWidth!: number;

  @Prop({ type: Number, default: 38 })
  contentHeight!: number;

  randomNum(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  randomColor(min: number, max: number) {
    const r = this.randomNum(min, max);
    const g = this.randomNum(min, max);
    const b = this.randomNum(min, max);
    return "rgb(" + r + "," + g + "," + b + ")";
  }

  drawPic() {
    const canvas = document.getElementById("s-canvas") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d") || new CanvasRenderingContext2D();
    ctx.textBaseline = "bottom";
    // 绘制背景
    ctx.fillStyle = "#e6ecfd";
    ctx.fillRect(0, 0, this.contentWidth, this.contentHeight);
    // 绘制文字
    for (let i = 0; i < this.identifyCode.length; i++) {
      this.drawText(ctx, this.identifyCode[i], i);
    }
    this.drawLine(ctx);
    this.drawDot(ctx);
  }

  drawText(ctx: CanvasRenderingContext2D, txt: string, i: number) {
    ctx.fillStyle = this.randomColor(50, 160); // 随机生成字体颜色
    ctx.font = this.randomNum(this.fontSizeMin, this.fontSizeMax) + "px SimHei"; // 随机生成字体大小
    const x = (i + 1) * (this.contentWidth / (this.identifyCode.length + 1));
    const y = this.randomNum(this.fontSizeMax, this.contentHeight - 5);
    const deg = this.randomNum(-30, 30);
    // 修改坐标原点和旋转角度
    ctx.translate(x, y);
    ctx.rotate((deg * Math.PI) / 180);
    ctx.fillText(txt, 0, 0);
    // 恢复坐标原点和旋转角度
    ctx.rotate((-deg * Math.PI) / 180);
    ctx.translate(-x, -y);
  }

  drawLine(ctx: CanvasRenderingContext2D) {
    // 绘制干扰线
    for (let i = 0; i < 4; i++) {
      ctx.strokeStyle = this.randomColor(100, 200);
      ctx.beginPath();
      ctx.moveTo(
        this.randomNum(0, this.contentWidth),
        this.randomNum(0, this.contentHeight)
      );
      ctx.lineTo(
        this.randomNum(0, this.contentWidth),
        this.randomNum(0, this.contentHeight)
      );
      ctx.stroke();
    }
  }

  drawDot(ctx: CanvasRenderingContext2D) {
    // 绘制干扰点
    for (let i = 0; i < 30; i++) {
      ctx.fillStyle = this.randomColor(0, 255);
      ctx.beginPath();
      ctx.arc(
        this.randomNum(0, this.contentWidth),
        this.randomNum(0, this.contentHeight),
        1,
        0,
        2 * Math.PI
      );
      ctx.fill();
    }
  }

  @Watch("identifyCode")
  identifyCodeChange() {
    this.drawPic();
  }

  mounted() {
    this.drawPic();
  }
}
</script>
