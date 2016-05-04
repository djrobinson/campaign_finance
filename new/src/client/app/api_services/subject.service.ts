import {Injectable} from 'angular2/core';
import {SUBJECTS} from '../subjects-list';
@Injectable()
export class SubjectService {
  getSubjects() {
    return Promise.resolve(SUBJECTS);
  }
}