import {Injectable} from 'angular2/core';
import {Subject} from './subject';
import {SUBJECTS} from './subjects-list';
@Injectable()
export class SubjectService {
  getSubjects() {
    return Promise.resolve(SUBJECTS);
  }
}