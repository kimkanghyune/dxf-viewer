import { Pattern, RegisterPattern } from "../../Pattern"

RegisterPattern(Pattern.ParsePatFile(`
*ESCHER,ESCHER
60, 0,0, -.6,1.03923048, 1.1,-.1
180, 0,0, -.6,1.03923048, 1.1,-.1
300, 0,0, .6,1.03923048, 1.1,-.1
60, .1,0, -.6,1.03923048, .2,-1
300, .1,0, .6,1.03923048, .2,-1
60, -.05,.08660254, -.6,1.03923048, .2,-1
180, -.05,.08660254, -.6,1.03923048, .2,-1
300, -.05,-.08660254, .6,1.03923048, .2,-1
180, -.05,-.08660254, -.6,1.03923048, .2,-1
60, -.4,0, -.6,1.03923048, .2,-1
300, -.4,0, .6,1.03923048, .2,-1
60, .2,-.34641016, -.6,1.03923048, .2,-1
180, .2,-.34641016, -.6,1.03923048, .2,-1
300, .2,.34641016, .6,1.03923048, .2,-1
180, .2,.34641016, -.6,1.03923048, .2,-1
0, .2,.17320508, -.6,1.03923048, .7,-.5
0, .2,-.17320508, -.6,1.03923048, .7,-.5
120, .05,.25980762, .6,1.03923048, .7,-.5
120, -.25,.08660254, .6,1.03923048, .7,-.5
240, -.25,-.08660254, .6,1.03923048, .7,-.5
240, .05,-.25980762, .6,1.03923048, .7,-.5
`), false)
