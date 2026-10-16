
const taskSchema = {
    type: "object",
    properties: {
        title: { type: "string", maxLength: 255 },
        description: { type: "string" },
        due_date: { type: "string", format: "date" },
        status: { type: "string", enum: ["pendiente", "en curso", "completada"] },
    },
    required: ["title", "description", "due_date", "status"],
};

export default taskSchema;