import type { LearningCourse } from "../types";

import module01 from "./module-01";
import module02 from "./module-02";

const professionalDressmaking: LearningCourse = {
  slug: "professional-dressmaking",

  modules: [
    module01,
    module02,
  ],
};

export default professionalDressmaking;