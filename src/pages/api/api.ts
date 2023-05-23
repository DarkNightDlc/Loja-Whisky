import React, { useState, useEffect } from "react"
import { createServer } from "miragejs"

createServer({
  routes() {
    this.get("/api/users", () => [
      { id: "1", name: "Luke" },
      { id: "2", name: "Leia" },
      { id: "3", name: "Anakin" },
    ])
    this.get("/api/produtos", () => [
      { id: "1", name: "bone" },
      { id: "2", name: "boina" },
      { id: "3", name: "bone2" },
      { id: "4", name: "boina2" },
      { id: "5", name: "bone3" },
      { id: "6", name: "boina3" },
      { id: "7", name: "boina4" },
      { id: "8", name: "boina4" }
    ])
  },
})

