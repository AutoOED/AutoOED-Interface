import {
  Button,
  Checkbox,
  Divider,
  Group,
  LoadingOverlay,
  Modal,
  NumberInput,
  Radio,
  SegmentedControl,
  Select,
  Stack,
  TextInput,
  Transition,
  useMantineTheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { forwardRef, useImperativeHandle, useState } from "react";
import {
  UserInterfaceForm,
  acquisitionNames,
  advancedSettingTypes,
  algorithms,
  asynchronousStrategys,
  initialTypes,
  problems,
  selectionNames,
  solverNames,
  surrogateNames,
  transfromConfig,
  types,
} from "./config";
import { useForm } from "@mantine/form";
import { FormValidateInput } from "@mantine/form/lib/types";
import { createStorage } from "@/util/storage";
const Storage = createStorage();
const defaultValidationRules: FormValidateInput<UserInterfaceForm> = {
  experimentName: (value) =>
    value.trim().length === 0 ? "Invalid experiment name" : null,
  problemName: (value) =>
    value.trim().length === 0 ? "Invalid problem name" : null,
  algorithmName: (value) =>
    value.trim().length === 0 ? "Invalid algorithm name" : null,
};

const UserInterfaceModal = forwardRef<UserInterfaceModalHandle | undefined>(
  (_, ref) => {
    const theme = useMantineTheme();
    const [opened, { open, close }] = useDisclosure(false);
    const [loading, setLoading] = useState(false);
    const [validationRules] = useState<FormValidateInput<UserInterfaceForm>>(
      defaultValidationRules
    );
    const form = useForm<UserInterfaceForm>({
      initialValues: {
        /**
         * base settings
         */
        type: "Problem",
        experimentName: "",
        algorithmName: "",
        problemName: "",
        initialzation: "Radom",
        asynchronousStrategy: "None",
        samples: 2,
        processes: 8,
        evaluationWorkers: 1,

        /**
         * advanced settings
         */
        advancedSettingType: "Surrogate",
        surrogateName: "GaussianProcess",
        acquisitionName: "ThompsonSampling",
        solverName: "NSGA-II",
        selectionName: "HypervolumeImprovement",
        meanSample: false,
        nu: 1,
        n_spectral_pts: 100,
        n_gen: 200,
        pop_size: 200,
      },
      validate: validationRules,
    });

    function handleCancel() {
      close();
      form.reset();
    }

    function handleCreate() {
      const { hasErrors, errors } = form.validate();
      if (hasErrors) {
        /**
         * 如果创建Expirement 有字段校验错误，根据type先后顺序切换到当前显示字段的type
         */
        const problemValidation = transfromConfig["Problem"] as string[];
        const optiValidation = transfromConfig["Optimization"] as string[];
        if (Object.keys(errors).some((v) => problemValidation.includes(v))) {
          form.setFieldValue("type", "Problem");
          return;
        }
        if (Object.keys(errors).some((v) => optiValidation.includes(v))) {
          form.setFieldValue("type", "Optimization");
          return;
        }
      } else {
        setLoading(true);
        const list = Storage.get("experiments") || [];
        if (list) {
          list.push(form.values);
        }
        Storage.set("experiments", list);
        setTimeout(() => {
          setLoading(false);
          close();
          form.reset();
        }, 1500);
      }
    }

    function getFormField(field: keyof UserInterfaceForm) {
      return form.values[field];
    }

    useImperativeHandle(ref, () => ({
      openModal: () => {
        open();
      },
    }));
    return (
      <Modal
        title="Create config by user interface"
        opened={opened}
        onClose={close}
        overlayProps={{
          color: theme.colors.gray[2],
          opacity: 0.55,
          blur: 2,
        }}
        style={{ position: "relative" }}
      >
        <LoadingOverlay visible={loading} overlayBlur={1} />
        <Stack>
          <TextInput
            label="Expreiment name"
            withAsterisk
            {...form.getInputProps("experimentName")}
          ></TextInput>
          <SegmentedControl
            data={types.map((v) => ({ label: v, value: v }))}
            {...form.getInputProps("type")}
          />

          <Transition
            mounted={opened}
            transition="slide-left"
            duration={1000}
            timingFunction="ease"
          >
            {(styles) => (
              <Stack style={styles}>
                {form.values.type === "Problem" && (
                  <>
                    <Select
                      label="Problem name"
                      withAsterisk
                      {...form.getInputProps("problemName")}
                      data={problems}
                    ></Select>
                    <Radio.Group
                      withAsterisk
                      label="Initialization"
                      {...form.getInputProps("initialzation")}
                    >
                      <Group>
                        {initialTypes.map((v) => (
                          <Radio key={v} value={v} label={v} />
                        ))}
                      </Group>
                    </Radio.Group>
                    <NumberInput
                      label="Random initial samples"
                      withAsterisk
                      min={2}
                      {...form.getInputProps("samples")}
                    ></NumberInput>
                  </>
                )}

                {form.values.type === "Optimization" && (
                  <>
                    <Select
                      label="Algorithm name"
                      withAsterisk
                      data={algorithms}
                      {...form.getInputProps("algorithmName")}
                    ></Select>
                    <NumberInput
                      label="Number of parallel processes to use"
                      withAsterisk
                      {...form.getInputProps("processes")}
                    ></NumberInput>
                    <Select
                      label="Asynchronous strategy"
                      withAsterisk
                      data={asynchronousStrategys}
                      {...form.getInputProps("asynchronousStrategy")}
                    ></Select>

                    <Divider
                      my="sm"
                      label="Advanced settings"
                      labelPosition="center"
                    />
                    <SegmentedControl
                      data={advancedSettingTypes.map((v) => ({
                        label: v,
                        value: v,
                      }))}
                      {...form.getInputProps("advancedSettingType")}
                    />

                    {form.values.advancedSettingType === "Surrogate" && (
                      <>
                        <Select
                          label="Name"
                          withAsterisk
                          data={surrogateNames}
                          {...form.getInputProps("surrogateName")}
                        ></Select>
                        <NumberInput
                          label="nu"
                          {...form.getInputProps("nu")}
                        ></NumberInput>
                      </>
                    )}

                    {form.values.advancedSettingType === "Acquisition" && (
                      <>
                        <Select
                          label="Name"
                          withAsterisk
                          data={acquisitionNames}
                          {...form.getInputProps("acquisitionName")}
                        ></Select>
                        <NumberInput
                          label="n_spectral_pts"
                          {...form.getInputProps("n_spectral_pts")}
                        ></NumberInput>
                        <Checkbox
                          label="mean_sample"
                          {...form.getInputProps("meanSample", {
                            type: "checkbox",
                          })}
                        ></Checkbox>
                      </>
                    )}

                    {form.values.advancedSettingType === "Solver" && (
                      <>
                        <Select
                          label="Name"
                          withAsterisk
                          data={solverNames}
                          {...form.getInputProps("solverName")}
                        ></Select>
                        <NumberInput
                          label="n_gen"
                          {...form.getInputProps("n_gen")}
                        ></NumberInput>
                        <NumberInput
                          label="pop_size"
                          {...form.getInputProps("pop_size")}
                        ></NumberInput>
                      </>
                    )}
                    {form.values.advancedSettingType === "Selection" && (
                      <>
                        <Select
                          label="Name"
                          withAsterisk
                          data={selectionNames}
                          {...form.getInputProps("selectionName")}
                        ></Select>
                      </>
                    )}
                  </>
                )}

                {form.values.type === "Evaluation" && (
                  <>
                    <NumberInput
                      label="Number of Evalution workers"
                      withAsterisk
                      {...form.getInputProps("evaluationWorkers")}
                    ></NumberInput>
                  </>
                )}
              </Stack>
            )}
          </Transition>

          <Group position="right" spacing="xl" mt="xs">
            <Button variant="subtle" onClick={handleCancel}>
              Cancel
            </Button>
            <Button variant="filled" onClick={handleCreate}>
              Create
            </Button>
          </Group>
        </Stack>
      </Modal>
    );
  }
);

export interface UserInterfaceModalHandle {
  openModal: () => void;
}

export default UserInterfaceModal;
