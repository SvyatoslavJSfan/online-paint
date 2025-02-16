/* eslint-disable import/no-anonymous-default-export */
import { makeAutoObservable } from "mobx";

class ToolState {

    tool = null

    constructor() {
        makeAutoObservable(this)
    }

    setTool(tool) {
        this.tool = tool
    }

    setFillColor(color) {
        this.tool.ctx.fillStyle = color
    }

    setStrokeColor(color) {
        this.tool.ctx.strokeStyle = color
    }

    setLineWidth(width) {
        this.tool.ctx.lineWidth = width
    }
}


export default new ToolState()