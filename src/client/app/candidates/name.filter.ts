import {Injectable, Pipe, PipeTransform} from 'angular2/core';

@Pipe({
  name: 'nameFilter'
})
@Injectable()
export class NameFilter implements PipeTransform {
  transform(candidates: any[], args: any[]): any {
    console.log("Here's the transform: ", candidates);
    return candidates.filter(candidate => candidate.CANDIDATE_NAME.toLowerCase().indexOf(args[0].toLowerCase()) !== -1);
  }
}