import bcrypt from 'bcryptjs';

const handleResponse = async (res, action) => {
  try {
    const result = await action();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const createController = (Model) => {

  const post = (req, res) => handleResponse(res, async () => {
    const entity = new Model(req.body);
    await entity.save();
    return { entity };
  });

  const getAll = (res) => handleResponse(res, async () => {
    const entities = await Model.find();
    return { entities };
  });

  const getOne = (req, res) => handleResponse(res, async () => {
    const id = req.body.id || req.params.id;
    const entity = await Model.findById(id);
    return { entity };
  });

  const update = (req, res) => handleResponse(res, async () => {
    const id = req.body.id || req.params.id; 
    const entity = await Model.findByIdAndUpdate(id, req.body);
    return { entity };
  });

  const remove = (req, res) => handleResponse(res, async () => {
    const id = req.body.id || req.params.id;
    await Model.findByIdAndUpdate(id, { status: false });

    return { message: 'Entity deleted successfully' };
  });

  return { 
    post, 
    getAll, 
    getOne, 
    update, 
    remove
  };
};

export default createController;
