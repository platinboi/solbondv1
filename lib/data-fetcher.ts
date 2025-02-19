async function fetchData() {
  try {
    const response = await fetch("/api/data")
    const text = await response.text()

    // Attempt to parse the JSON, but handle potential errors
    let data
    try {
      data = JSON.parse(text)
    } catch (parseError) {
      console.error("Error parsing JSON:", parseError)
      console.log("Received text:", text)
      throw new Error("Invalid JSON received from server")
    }

    return data
  } catch (error) {
    console.error("Error fetching data:", error)
    throw error
  }
}

export { fetchData }

