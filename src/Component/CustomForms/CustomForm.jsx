import Form from "react-bootstrap/Form";
import _ from "lodash";
import moment from "moment";
import React from "react";
import Col from "react-bootstrap/Col";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Button from "react-bootstrap/Button";
import { InputGroup, Spinner } from "react-bootstrap";

const CustomInput = ({
  label,
  isDisabled,
  isRequired,
  name,
  type = "text",
  value,
  err,
  md = 4,
  lg = 4,
  placeholder,
  isInvalid,

  isTextArea = false,
}) => {
  return (
    <>
      <Form.Group as={Col} md={md} lg={lg} className="mt-1 mb-1">
        <Form.Label style={{ textTransform: "capitalize", color: "black" }}>
          {label}{" "}
          {isRequired === true && (
            <span
              style={{
                marginTop: "0.3rem",
                marginLeft: "0.3rem",
                fontSize: "1.2rem",
                display: "inline !important",
                position: "unset !important",
                color: "red",
              }}
            >
              *
            </span>
          )}
        </Form.Label>
        <Form.Control
          disabled={isDisabled}
          type={type}
          name={name}
          value={
            type === "date"
              ? moment(
                  _.isNumber(_.toNumber(value)) && !_.isNaN(_.toNumber(value))
                    ? _.toNumber(value)
                    : value
                )
                  .format("YYYY-MM-DD")
                  .toString()
              : _.toString(value)
          }
          isInvalid={isInvalid}
          placeholder={placeholder}
          as={isTextArea ? "textarea" : "input"}
        />
        <Form.Control.Feedback type="invalid">
          {_.capitalize(err || "")}
        </Form.Control.Feedback>
      </Form.Group>
    </>
  );
};
const CustomInputPassword = ({
  label,
  value,
  name,
  isInvalid,
  err,
  placeholder,
  type = "text",
  isRequired = false,
  handleChange,
  md = 4,
  lg = 4,
  isDisabled,
}) => {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  return (
    <>
      <Form.Group as={Col} md={md} lg={lg} className="mt-1 mb-1">
        <Form.Label style={{ textTransform: "capitalize", color: "black" }}>
          {label}{" "}
          {isRequired === true && (
            <span
              style={{
                marginTop: "0.3rem",
                marginLeft: "0.3rem",
                fontSize: "1.2rem",
                display: "inline !important",
                position: "unset !important",
                color: "red",
              }}
            >
              *
            </span>
          )}
        </Form.Label>
        <InputGroup>
          <Form.Control
            type={show ? "text" : "password"}
            name={name}
            onChange={handleChange}
            placeholder={placeholder}
            value={
              type === "date"
                ? moment(
                    _.isNumber(_.toNumber(value)) && !_.isNaN(_.toNumber(value))
                      ? _.toNumber(value)
                      : value
                  )
                    .format("YYYY-MM-DD")
                    .toString()
                : _.toString(value)
            }
            disabled={isDisabled}
            isInvalid={isInvalid}
          />
          <Button
            style={{
              borderColor: "lightgray",
              backgroundColor: "white",
              borderTopRightRadius: 6,
              borderBottomRightRadius: 6,
            }}
            color="white"
            size="sm"
            variant="outline-secondary"
            id="button-addon2"
            onClick={handleClick}
          >
            <span onClick={handleClick}>
              {show ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </Button>

          <Form.Control.Feedback type="invalid">
            {_.capitalize(err || "")}
          </Form.Control.Feedback>
        </InputGroup>
      </Form.Group>
      {/* <Form.Group as={Col} md={md} lg={lg} className="mt-1 mb-1">
        <Form.Label>
          {label}{" "}
          {isRequired === true && (
            <span
              className={css`
                margin-top: 0.3rem;
                font-size: 1rem;
                display: inline !important;
                position: unset !important;
                color: red;
              `}
            >
              *
            </span>
          )}
        </Form.Label>
        <InputGroup>
          <Form.Control
            style={{ fontSize: 15 }}
            type={show ? "text" : "Password"}
            name={name}
            value={
              type === "date"
                ? moment(
                    _.isNumber(_.toNumber(value)) && !_.isNaN(_.toNumber(value))
                      ? _.toNumber(value)
                      : value
                  )
                    .format("YYYY-MM-DD")
                    .toString()
                : _.toString(value)
            }
            isInvalid={isInvalid}
            placeholder={_.capitalize(placeholder)}
            as={isTextArea ? "textarea" : "input"}
          />
          <Button
            className={css`
              hover: white;
            `}
            style={{
              borderColor: "lightgray",
              backgroundColor: "white",
              borderTopRightRadius: 6,
              borderBottomRightRadius: 6,
            }}
            color="white"
            size="sm"
            variant="outline-secondary"
            id="button-addon2"
            onClick={handleClick}
          >
            <IconButton
              _active={{ bg: "" }}
              _hover={{ bg: "" }}
              bg={"white"}
              size={"xs"}
              aria-label="Password"
              onClick={handleClick}
              icon={
                show ? (
                  <IoEyeOffSharp color="#0f4d7e" size={18} />
                ) : (
                  <IoEyeSharp color="#0f4d7e" size={18} />
                )
              }
            />
          </Button>
          <Form.Control.Feedback type="invalid" style={{ marginTop: 0 }}>
            {err || ""}
          </Form.Control.Feedback>
        </InputGroup>
      </Form.Group> */}
    </>
  );
};

const CustomButton = ({
  label = "submit",
  md = 4,
  lg = 4,
  isSubmitting,
  className,
}) => {
  return (
    <Form.Group as={Col} md={md} lg={lg} className="mt-1">
      <Button
        disabled={isSubmitting}
        type="submit"
        style={{
          background: "#161D29",
        }}
        className={className}
      >
        {isSubmitting ? (
          <Spinner
            animation="border"
            role="status"
            style={{ height: "1rem", width: "1rem", marginRight: "0.5rem" }}
          >
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : (
          ""
        )}
        {_.startCase(label)}
      </Button>
    </Form.Group>
  );
};
export { CustomInput, CustomInputPassword, CustomButton };
