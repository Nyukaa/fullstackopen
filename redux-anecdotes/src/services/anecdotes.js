const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const response = await fetch(baseUrl);

  if (!response.ok) {
    throw new Error("Failed to fetch anecdotes");
  }

  return await response.json();
};
const createNew = async (content) => {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content, votes: 0 }),
  };

  const response = await fetch(baseUrl, options);

  if (!response.ok) {
    throw new Error("Failed to create anecdote");
  }

  return await response.json();
};

const updateVotes = async (id, changedA) => {
  const response = await fetch(`${baseUrl}/${id}`, {
    method: "PUT", // или PATCH
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(changedA),
  });

  if (!response.ok) {
    throw new Error("Failed to update anecdote votes");
  }

  return await response.json();
};

export default { getAll, createNew, updateVotes };
