assert = require('assert');
Parser = require('../src/molecularParser');

describe('molecularParser', function() {
  describe('findSubgroups', function() {
    subgroupTestData = {
      CH2O: [
        {
          formula: 'CH2O',
          count: 1
        }
      ],
      'CH(CH3)3': [
        {
          formula: 'CH',
          count: 1
        },
        {
          formula: 'CH3',
          count: 3
        }
      ],
      'CH(CH3)2OH': [
        {
          formula: 'CH',
          count: 1
        },
        {
          formula: 'CH3',
          count: 2
        },
        {
          formula: 'OH',
          count: 1
        }
      ],
      '(NH4)2SO4': [
        {
          formula: 'NH4',
          count: 2
        },
        {
          formula: 'SO4',
          count: 1
        },
      ],
      'C6H2(NO2)3(CH3)3': [
        {
          formula: 'C6H2',
          count: 1
        },
        {
          formula: 'NO2',
          count: 3
        },
        {
          formula: 'CH3',
          count: 3
        },
      ]

    }

    it('should parse easy formulae correctly.', function() {
      for (var formula in subgroupTestData) {
        assert.deepEqual(Parser.findSubgroups(formula), subgroupTestData[formula], "Should parse " + formula + " correctly");
      }
    });

    it('should parse crazy formulae correctly.', function() {
      var formula = '(CH3)16(Tc(H2O)3CO(BrFe3(ReCl)3(SO4)2)2)2MnO4';
      var subgroups = [
        {
          formula: 'CH3',
          count: 16
        },
        {
          formula: 'Tc(H2O)3CO(BrFe3(ReCl)3(SO4)2)2',
          count: 2
        },
        {
          formula: 'MnO4',
          count: 1
        }
      ];
      var parsedSubgroups = Parser.findSubgroups(formula); 
      assert.deepEqual(parsedSubgroups, subgroups, "Parser found " + JSON.stringify(parsedSubgroups) + " when it should have found " + JSON.stringify(subgroups));
    });
  }); //end parseSubgroups

  describe('decomposeFormula', function() {
    var decomposeTestData = {
      CH2O: {
        C: 1,
        H: 2,
        O: 1 
      },
      'CH(CH3)3': {
        C: 4,
        H: 1+3*3
      },
      'CH(CH3)2OH': {
        C: 3,
        H: 8,
        O: 1
      },
      '(NH4)2SO4': {
        N: 2,
        H: 8,
        S: 1,
        O: 4
      },
      'C6H2(NO2)3(CH3)3': {
        C: 6+3,
        H: 2+9,
        N: 3,
        O: 2*3
      }
    };

    it('should decompose formulae correctly', function() {
      for (var formula in decomposeTestData) {
        assert.deepEqual(Parser.decomposeFormula(formula), decomposeTestData[formula]);
      }

    });

    it('should decompose crazy formulae correctly.', function() {
      var formula = '(CH3)16(Tc(H2O)3CO(BrFe3(ReCl)3(SO4)2)2)2MnO4';
      var decomposition = {
        C: 16+1*2,
        H: 3*16+2*3*2,
        Tc: 2,
        O: (3 + 1 + 4*2*2)*2 + 4,
        Br: 1*2*2,
        Fe: 3*2*2,
        Re: 3*2*2,
        Cl: 3*2*2,
        S: 2*2*2,
        Mn: 1
      };
      var parsedDecomposition = Parser.decomposeFormula(formula); 
      assert.deepEqual(parsedDecomposition, decomposition, "Parser found " + JSON.stringify(parsedDecomposition) + " when it should have found " + JSON.stringify(decomposition));
    });
  }); //end decomposeformula
});
