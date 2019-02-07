import ExamplesService from './service';
import { Request, Response } from 'express';

export class Controller {
  all = async (req: Request, res: Response) => {
    const r = ExamplesService.all();
    res.json(r);
  };

  byId = async (req: Request, res: Response) => {
    const r = await ExamplesService.byId(req.params.id);
    if (r) res.json(r);
    else res.status(404).end();
  };

  create = async (req: Request, res: Response) => {
    const r = await ExamplesService.create(req.body.name);
    res
      .status(201)
      .location(`<%= apiRoot %>/examples/${r.id}`)
      .json(r);
  };
}
export default new Controller();
