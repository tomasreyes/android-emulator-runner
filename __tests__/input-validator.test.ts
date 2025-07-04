import * as validator from '../src/input-validator';
import { MAX_PORT, MIN_PORT } from '../src/input-validator';

describe('arch validator tests', () => {
  it('Throws if arch is unknown', () => {
    const func = () => {
      validator.checkArch('some-arch');
    };
    expect(func).toThrowError(`Value for input.arch 'some-arch' is unknown. Supported options: ${validator.VALID_ARCHS}`);
  });

  it('Validates successfully with valid arch', () => {
    const func1 = () => {
      validator.checkArch('x86');
    };
    expect(func1).not.toThrow();

    const func2 = () => {
      validator.checkArch('x86_64');
    };
    expect(func2).not.toThrow();
  });
});

describe('channel validator tests', () => {
  it('Throws if channel is unknown', () => {
    const func = () => {
      validator.checkChannel('some-channel');
    };
    expect(func).toThrowError(`Value for input.channel 'some-channel' is unknown. Supported options: ${validator.VALID_CHANNELS}`);
  });

  it('Validates successfully with valid channel', () => {
    const func1 = () => {
      validator.checkChannel('stable');
    };
    expect(func1).not.toThrow();

    const func2 = () => {
      validator.checkChannel('beta');
    };
    expect(func2).not.toThrow();

    const func3 = () => {
      validator.checkChannel('dev');
    };
    expect(func3).not.toThrow();

    const func4 = () => {
      validator.checkChannel('canary');
    };
    expect(func4).not.toThrow();
  });
});

describe('force-avd-creation validator tests', () => {
  it('Throws if force-avd-creation is not a boolean', () => {
    const func = () => {
      validator.checkForceAvdCreation('yes');
    };
    expect(func).toThrowError(`Input for input.force-avd-creation should be either 'true' or 'false'.`);
  });

  it('Validates successfully if force-avd-creation is either true or false', () => {
    const func1 = () => {
      validator.checkForceAvdCreation('true');
    };
    expect(func1).not.toThrow();

    const func2 = () => {
      validator.checkForceAvdCreation('false');
    };
    expect(func2).not.toThrow();
  });
});

describe('emulator-port validator tests', () => {
  it('Validates if emulator-port is even and in range', () => {
    const func = () => {
      validator.checkPort(5554);
    };
    expect(func).not.toThrow();
  });
  it('Throws if emulator-port is lower than MIN_PORT', () => {
    const func = () => {
      validator.checkPort(MIN_PORT - 2);
    };
    expect(func).toThrow();
  });
  it('Throws if emulator-port is higher than MAX_PORT', () => {
    const func = () => {
      validator.checkPort(MAX_PORT + 2);
    };
    expect(func).toThrow();
  });
  it('Throws if emulator-port is odd', () => {
    const func = () => {
      validator.checkPort(5555);
    };
    expect(func).toThrow();
  });
});

describe('disable-animations validator tests', () => {
  it('Throws if disable-animations is not a boolean', () => {
    const func = () => {
      validator.checkDisableAnimations('yes');
    };
    expect(func).toThrowError(`Input for input.disable-animations should be either 'true' or 'false'.`);
  });

  it('Validates successfully if disable-animations is either true or false', () => {
    const func1 = () => {
      validator.checkDisableAnimations('true');
    };
    expect(func1).not.toThrow();

    const func2 = () => {
      validator.checkDisableAnimations('false');
    };
    expect(func2).not.toThrow();
  });
});

describe('disable-spellchecker validator tests', () => {
  it('Throws if disable-spellchecker is not a boolean', () => {
    const func = () => {
      validator.checkDisableSpellchecker('yes');
    };
    expect(func).toThrowError(`Input for input.disable-spellchecker should be either 'true' or 'false'.`);
  });

  it('Validates successfully if disable-spellchecker is either true or false', () => {
    const func1 = () => {
      validator.checkDisableSpellchecker('true');
    };
    expect(func1).not.toThrow();

    const func2 = () => {
      validator.checkDisableSpellchecker('false');
    };
    expect(func2).not.toThrow();
  });
});

describe('disable-linux-hw-accel validator tests', () => {
  it('Throws if disable-linux-hw-accel is not a boolean', () => {
    const func = () => {
      validator.checkDisableLinuxHardwareAcceleration('yes');
    };
    expect(func).toThrowError(`Input for input.disable-linux-hw-accel should be either 'true' or 'false' or 'auto'.`);
  });

  it('Validates successfully if disable-linux-hw-accel is either true or false or auto', () => {
    const func1 = () => {
      validator.checkDisableLinuxHardwareAcceleration('true');
    };
    expect(func1).not.toThrow();

    const func2 = () => {
      validator.checkDisableLinuxHardwareAcceleration('false');
    };
    expect(func2).not.toThrow();

    const func3 = () => {
      validator.checkDisableLinuxHardwareAcceleration('auto');
    };
    expect(func3).not.toThrow();
  });
});

describe('enable-hw-keyboard validator tests', () => {
  it('Throws if enable-hw-keyboard is not a boolean', () => {
    const func = () => {
      validator.checkEnableHardwareKeyboard('yes');
    };
    expect(func).toThrowError(`Input for input.enable-hw-keyboard should be either 'true' or 'false'.`);
  });

  it('Validates successfully if enable-hardware-keyboard is either true or false', () => {
    const func1 = () => {
      validator.checkEnableHardwareKeyboard('true');
    };
    expect(func1).not.toThrow();

    const func2 = () => {
      validator.checkEnableHardwareKeyboard('false');
    };
    expect(func2).not.toThrow();
  });
});

describe('emulator-build validator tests', () => {
  it('Throws if emulator-build is not a number', () => {
    const func = () => {
      validator.checkEmulatorBuild('abc123');
    };
    expect(func).toThrowError(`Unexpected emulator build: 'abc123'.`);
  });

  it('Throws if emulator-build is not an integer', () => {
    const func = () => {
      validator.checkEmulatorBuild('123.123');
    };
    expect(func).toThrowError(`Unexpected emulator build: '123.123'.`);
  });

  it('Validates successfully with valid emulator-build', () => {
    const func = () => {
      validator.checkEmulatorBuild('6061023');
    };
    expect(func).not.toThrow();
  });
});

describe('checkDiskSize validator tests', () => {
  it('Empty size is acceptable, means default', () => {
    const func = () => {
      validator.checkDiskSize('');
    };
    expect(func).not.toThrow();
  });

  it('Numbers means bytes', () => {
    expect(() => {
      validator.checkDiskSize('8000000000');
    }).not.toThrow();
  });

  it('Uppercase size modifier', () => {
    expect(() => {
      validator.checkDiskSize('8000000K');
    }).not.toThrow();
    expect(() => {
      validator.checkDiskSize('8000M');
    }).not.toThrow();
    expect(() => {
      validator.checkDiskSize('8G');
    }).not.toThrow();
  });

  it('Lowercase size modifier', () => {
    expect(() => {
      validator.checkDiskSize('8000000k');
    }).not.toThrow();
    expect(() => {
      validator.checkDiskSize('8000m');
    }).not.toThrow();
    expect(() => {
      validator.checkDiskSize('8g');
    }).not.toThrow();
  });

  it('Modifier without a number is unacceptable', () => {
    expect(() => {
      validator.checkDiskSize('G');
    }).toThrowError(`Unexpected disk size: 'G'.`);
  });

  it('Double modifier is unacceptable', () => {
    expect(() => {
      validator.checkDiskSize('14gg');
    }).toThrowError(`Unexpected disk size: '14gg'.`);
  });
});
