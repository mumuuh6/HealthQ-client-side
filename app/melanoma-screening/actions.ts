"use server"

export async function analyzeSkinImage(formData: FormData) {
  const imageFile = formData.get("file") as File

  if (!imageFile) {
    throw new Error("No image provided")
  }

  try {
    const res = await fetch("https://waresur-scd-api.hf.space/predict", {
      method: "POST",
      body: formData,
    })

    if (!res.ok) {
      throw new Error("Failed to analyze image")
    }

    const data = await res.json()

    // API returns:
    // { prediction: "Benign", predicted_index: 0, confidence: 100.0 }

    // Map to your frontend expected format
    let risk: "low" | "medium" | "high" = "low"
    let features: string[] = []

    if (data.prediction === "Benign") {
      risk = "low"
      features = ["Looks benign", "Regular appearance"]
    } else {
      risk = "high"
      features = ["Possible malignancy detected", "Irregular appearance"]
    }

    return {
      risk,
      confidence: data.confidence,
      features,
    }
  } catch (err) {
    console.error("API error:", err)
    throw new Error("Error analyzing image")
  }
}
