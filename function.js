window.function = async function(api_key, vector_store_id, file_id) {
    // Validate API Key
    if (!api_key.value) {
        return "Error: OpenAI API Key is required.";
    }

    // Validate Vector Store ID
    if (!vector_store_id.value) {
        return "Error: Vector Store ID is required.";
    }

    // Validate File ID
    if (!file_id.value) {
        return "Error: File ID is required.";
    }

    // Construct request payload
    const payload = {
        file_id: file_id.value
    };

    // API endpoint URL
    const apiUrl = `https://api.openai.com/v1/vector_stores/${vector_store_id.value}/files`;

    // Make API request
    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${api_key.value}`,
                "OpenAI-Beta": "assistants=v2"
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errorData = await response.json();
            return `Error ${response.status}: ${errorData.error?.message || "Unknown error"}`;
        }

        // Parse and return the response
        const responseData = await response.json();
        return JSON.stringify(responseData, null, 2);

    } catch (error) {
        return `Error: Request failed - ${error.message}`;
    }
};
