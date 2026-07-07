import api from "./api";

export const generateAPI = {
  generate(data) {
    return api.post("/ai-generator/generate", {
      prompt: data.prompt,
      provider: data.provider,
      model: data.model,
      application_id: data.application_id,
      stream: false,
    });
  },
};
